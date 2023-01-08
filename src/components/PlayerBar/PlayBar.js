import { memo, useEffect, useRef, useState } from 'react';
import { HiOutlineHeart } from "react-icons/hi";
import { HiPlay, HiBackward, HiForward, HiPause } from "react-icons/hi2";
import { BiShuffle, BiRepeat } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from "../../Context/AuthContext";
import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import { db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";

import classname from 'classnames/bind'
import style from './PlayerBar.module.scss'

const cx = classname.bind(style)

function PlayerBar({page}) {

    const { currentSongs, currentIndex, isPlaying, currentPlaylist, bar } = useSelector((state) => state.player)
    const {tracks, currentUser} = useAuth()
    const inFav = tracks.includes(currentSongs?.id)
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
        if (page !== 'album') {
            if (currentSongs) {
                setArtists(currentSongs?.artists)
                setImage(currentSongs?.album?.images)
            }
        } else {
            if (currentSongs) {
                setArtists(currentSongs?.artists)
            }
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
    
    }, [ image, artists, currentSongs])

    const handleRepeated = () => {
        setIsRepeated(!isRepeated)
    }

    const handlePrevTrack = () => {
        dispatch(playPause(false));
        audioRef.current.pause()

        if (isRandom) {
            dispatch(prevSong(Math.floor(Math.random()*currentIndex)));
        } else {
            dispatch(prevSong(currentIndex - 1));   

        }
    }
    
    const handleNextTrack = () => {
        dispatch(playPause(false));
        audioRef.current.pause()

        if (isRandom) {
            dispatch(nextSong(Math.floor(Math.random()*(currentPlaylist.length - currentIndex))));
        } else {
            if (currentIndex === currentPlaylist.length - 1) {
                dispatch(nextSong(0));
            } else {                      
                dispatch(nextSong(currentIndex + 1));
            }         
        }
    }

    const handleRandomTrack = () => {
        setIsRandom(!isRandom)
    }

    const handlePlay = async () => {
        audioRef.current.play();
        dispatch(playPause(true));
    }

    const handlePause = () => {
        audioRef.current.pause()
        dispatch(playPause(false));
    }

    const handleClicked = async () => {
        const trackRef = doc(db, "tracks", currentUser.uid)
        if (inFav) {
            try {
                await setDoc(trackRef, 
                    {track: tracks.filter((item) => item !== track.id)},
                    {merge: "true"}
                )
                alert(`${track.name} removed from Favourite!`)
            } catch (error) {
                alert(`${track.name} fail to removed from Favourite!`)
            }
        } else {
            try {
                await setDoc(trackRef, 
                    {track: tracks ? [...tracks, track.id] : [track.id]},
                )
                
                alert(`${track.name} added to Favourite!`)
            } catch (error) {
                alert(`${track.name} fail to added to Favourite!`)
            }
        }
    }   

    return ( 
        <div ref={wrapperRef} className={bar ?  cx('wrapper', 'visible') : cx('wrapper', 'hide')}>
            { currentSongs?.name
                ?
                    <div className={cx('wrapper-track')}>
                        {url?.url 
                            ? <img className={cx('wrapper-track--img')} src={url?.url} alt="name"/>
                            : undefined
                        }
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
                    <BiShuffle 
                        className={isRandom ? cx('clicked-button') : cx('random-icon')} onClick={handleRandomTrack}
                    />   
                    <audio ref={audioRef} src={currentSongs?.preview_url}/>
            </div>
            <div className={cx('wrapper-feature')}>
                <HiOutlineHeart 
                    className={inFav ? cx('wrapper-track--infor-heart', 'liked') : cx('wrapper-track--infor-heart')}
                    onClick={currentUser ? handleClicked : undefined}
                />         
            </div>
        </div>
    );
}

export default memo(PlayerBar);