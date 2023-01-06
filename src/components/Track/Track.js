import { useDispatch, useSelector } from 'react-redux';
import { db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { playPause, setActivePlayer, setActiveSong, playerBar } from '../../redux/features/playerSlice';
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";

import classname from 'classnames/bind'
import style from './Track.module.scss'
import React, { useRef, useState } from 'react';


const cx = classname.bind(style)

function Track({data, index}) {
    const { activeSong } = useSelector((state) => state.player);  
    const {tracks, currentUser} = useAuth()

    const track = data.track
    const inFav = tracks.includes(track.id)
    const dispatch = useDispatch()
    const wrapperRef = useRef()
    const order = index + 1;
    const trackNameRef = useRef()

    const nav = useNavigate()

    const [image, setImage] = useState(track.album.images)
    const [artists, setArtists] = useState(track.album.artists)

    const seconds = ((track.duration_ms % 60000) / 1000).toFixed(0);
    const minutes = Math.floor(track.duration_ms / 60000) + ":" + (seconds < 10 ? '0' : '') + seconds;

    const imageUrl = image.find(item => item.height === 64)

    const artistId = artists.map(item => item.id)
    const artistName = artists.map(item => item.name)
    
    const handleClicked = () => {
        dispatch(setActiveSong({track, index}));
        dispatch(playPause(false))
        dispatch(setActivePlayer(true))
    }

    const handleAdd = async () => {
        const trackRef = doc(db, "tracks", currentUser.uid)
        try {
            await setDoc(trackRef, 
                {track: tracks ? [...tracks, track.id] : [track.id]},
            )           
            alert(`${track.name} added to Favourite!`)
        } catch (error) {
            alert(`${track.name} fail to added to Favourite!`)
        }
    }

    const handleRemove= async () => {
        const trackRef = doc(db, "tracks", currentUser.uid)
        try {
            await setDoc(trackRef, 
                {track: tracks.filter((item) => item !== track.id)},
                {merge: "true"}
            )
            alert(`${track.name} removed from Favourite!`)
        } catch (error) {
            alert(`${track.name} fail to removed from Favourite!`)
        }
    }

    const handleLikedTrack = async () => {
        if (!currentUser) {
            alert('You must login to use this feature')
        } else {
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
    }

    const handleNav = (id) => {
        dispatch(playerBar(false))
        dispatch(setActivePlayer(false))
        nav(`/artist/${id}`)
    }

    return ( 
        <div 
            ref={wrapperRef}
            className={
                activeSong === track.name ? cx('wrapper', 'active') : cx('wrapper')           
            } 
        >
            <span className={cx('wrapper-track--index')}>{order}</span>
            <div className={cx('wrapper-right')} >
                <div className={cx('wrapper-track--infor')} onClick={handleClicked}>              
                    <img src={imageUrl.url} className={cx('wrapper-track--infor-img')} alt={track.name}/>  
                    <div 
                        className={cx('wrapper-track-infor--main')} 
                    >
                        <span className={cx('wrapper-track--name')} ref={trackNameRef}>{track.name}</span>
                        <div className={cx('wrapper-artists')}>
                            {
                                artists.map(item => 
                                    <div key={item.id} onClick={() => handleNav(item.id)} className={cx('wrapper-track--artist-link')}>
                                        <span className={cx('wrapper-track--artist')}>
                                            {item.name}
                                        </span>
                                    </div>
                                )
                            }
                        </div>                                 
                    </div>
                </div>         
                <span className={cx('wrapper-duration')}>{minutes}</span>
                <HiOutlineHeart 
                    className={inFav ? cx('wrapper-track-heart', 'saved') : cx('wrapper-track-heart')} 
                    onClick={handleLikedTrack}
                />
            </div>          
        </div>
    );
}

export default Track;