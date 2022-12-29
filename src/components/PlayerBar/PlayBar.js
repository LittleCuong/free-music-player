import classname from 'classnames/bind'
import style from './PlayerBar.module.scss'
import { memo, useEffect, useRef, useState } from 'react';
import { HiOutlineHeart } from "react-icons/hi";
import { HiPlay, HiBackward, HiForward, HiPause } from "react-icons/hi2";
import { BiShuffle, BiRepeat } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';

import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';

const cx = classname.bind(style)

function PlayerBar() {

    const { playerBar, currentSongs, currentIndex, isActive, isPlaying, currentPlaylist } = useSelector((state) => state.player)
    console.log(playerBar);
    const audioRef = useRef()
    const wrapperRef = useRef()

    const [track, setTrack] = useState()
    const [url, setUrl] = useState()
    const [image, setImage] = useState()
    const [artist, setArtist] = useState()
    const [artists, setArtists] = useState()
    const [isRandom, setIsRandom] = useState(false)
    const [isRepeated, setIsRepeated] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        setTrack(currentSongs)
    }, [currentSongs])

    useEffect(() => {
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
        <div ref={wrapperRef} className={playerBar ? cx('wrapper', 'visible') : cx('wrapper', 'hide')}>
            { currentSongs.name
                ?
                    <div className={cx('wrapper-track')}>
                        <img className={cx('wrapper-track--img')} src={url?.url} alt="name"/>
                        <div className={cx('wrapper-track--infor')}>
                            <span className={cx('wrapper-track--infor-name')}>{currentSongs.name}</span>
                            <span className={cx('wrapper-track--infor-artist')}>{artist?.join(", ")}</span>               
                        </div>     
                    </div>
                :
                    <div className={cx('wrapper-track')}>     
                    </div>
            }      
            <div className={cx('wrapper-control')}>
                {   isRepeated 
                    ? <BiRepeat onClick={handleRepeated} className={cx('clicked-button')}/> 
                    : <BiRepeat onClick={handleRepeated} className={cx('random-icon')}/>
                }
                    <div className={cx('player-control--center')}>
                        <HiBackward className={cx('control-icon-small')} onClick={handlePrevTrack}/>
                        {   isPlaying 
                                ? <HiPause className={cx('control-icon')} onClick={handlePause}/> 
                                : <HiPlay className={cx('control-icon')} onClick={handlePlay}/>
                        }
                        <HiForward className={cx('control-icon-small')} onClick={handleNextTrack}/>   
                    </div>                 
                    <BiShuffle className={isRandom ? cx('clicked-button') : cx('random-icon')} onClick={handleRandomTrack}/>   
                    <audio ref={audioRef} src={currentSongs.preview_url} onEnded={handleOnEnded}/>
            </div>
            <div className={cx('wrapper-feature')}>
                <HiOutlineHeart className={cx('wrapper-track--infor-heart')}/>         
            </div>
        </div>
    );
}

export default memo(PlayerBar);