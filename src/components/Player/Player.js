import classname from 'classnames/bind'
import style from './Player.module.scss'
import { useEffect, useRef, useState, memo } from 'react';
import { HiPlay, HiBackward, HiForward, HiPause } from "react-icons/hi2";
import { BiShuffle, BiRepeat } from "react-icons/bi";
import RecommendTrack from '../RecommendTrack/RecommendTrack';

import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import { useSelector, useDispatch } from 'react-redux';


const cx = classname.bind(style)

function Player() {

    const audioRef = useRef()
    const { activeSong, currentSongs, currentIndex, isActive, isPlaying, currentPlaylist } = useSelector((state) => state.player);
    console.log(currentSongs);
    const [track, setTrack] = useState()
    const [url, setUrl] = useState()
    const [image, setImage] = useState()
    const [artists, setArtists] = useState()
    const [artist, setArtist] = useState()
    const [isRandom, setIsRandom] = useState(false)
    const [isRepeated, setIsRepeated] = useState(false)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     setTrack(currentSongs)
    // }, [currentSongs])

    useEffect(() => {
        setTrack(currentSongs)

        if (track) {
            setArtists(currentSongs.artists)
            setImage(currentSongs.album.images)
        }

        if (image !== undefined) {
            setUrl(image.find(item => {
                if (item.width === 300) {
                    return item.url
                }
            }))
        }
        if (artists !== undefined) {
            setArtist(artists.map(item => item.name))
        }
    
    }, [currentSongs, image, artists])

    const handleRepeated = () => {
        setIsRepeated(!isRepeated)
    }

    const handlePrevTrack = () => {
        dispatch(playPause(false));
        audioRef.current.pause()

        if (isRandom) {
            dispatch(nextSong(Math.floor(Math.random()*currentIndex)));
        } else {
            dispatch(nextSong(currentIndex - 1));   

        }
    }
    const handleNextTrack = () => {
        dispatch(playPause(false));
        audioRef.current.pause()

        if (isRandom) {
            dispatch(nextSong(Math.floor(Math.random()*(currentPlaylist.length - currentIndex))));
        } else {
            if (currentIndex !== currentPlaylist.length) {
                dispatch(nextSong(currentIndex + 1));
            } else {                      
                dispatch(nextSong(0));
            }         
        }
    }

    const handleRandomTrack = () => {
        setIsRandom(!isRandom)
    }

    const handlePlay = () => {
        audioRef.current.play()
        dispatch(playPause(true));
    }

    const handlePause = () => {
        audioRef.current.pause()
        dispatch(playPause(false));
    }

    const handleOnEnded = () => {
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-header')}>
                <RecommendTrack 
                    // data={currentSongs.artists} 
                    // callback={(data) => setTrack(data)}
                    index={currentIndex}
                />      
            </div>
            <div className={cx('wrapper-main')}>
                <div className={cx('wrapper-main-image')}>
                    <img className={cx('track-image')} src={url?.url} alt={currentSongs.name}/>
                </div>
                <div className={cx('wrapper-main-infor')}>
                    <span className={cx('track-name')}>{currentSongs.name}</span>
                    <span className={cx('track-artist')}>{artist?.join(", ")}</span>    
                </div>
                <div className={cx('wrapper-main-control')}>
                    <div className={cx('player-control')}>
                        {   isRepeated
                                ?
                                    <BiRepeat onClick={handleRepeated} className={cx('clicked-button')}/>           
                                : 
                                    <BiRepeat onClick={handleRepeated} className={cx('random-icon')}/>                                       
                        }
                        <div className={cx('player-control--center')}>
                            <HiBackward className={cx('control-icon-small')} onClick={handlePrevTrack}/>
                            {   isPlaying 
                                    ? 
                                        <HiPause className={cx('control-icon')} onClick={handlePause}/> 
                                    :   <HiPlay className={cx('control-icon')} onClick={handlePlay}/>
                            }
                            <HiForward className={cx('control-icon-small')} onClick={handleNextTrack}/>   
                        </div>                 
                        <BiShuffle className={isRandom ? cx('clicked-button') : cx('random-icon')} onClick={handleRandomTrack}/>           
                    </div>
                    <div className={cx('player-seekbar')}>     
                        <audio ref={audioRef} src={currentSongs.preview_url} onEnded={handleOnEnded}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Player);