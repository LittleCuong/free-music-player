import { HiOutlineHeart } from "react-icons/hi";
import classname from 'classnames/bind'
import style from './Track.module.scss'
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { playPause, setActiveSong } from '../../redux/features/playerSlice';
import { useAuth } from "../../Context/AuthContext";

const cx = classname.bind(style)

// function Track({data, onClick, index}) {
function Track({data, index}) {

    const { currentSongs, activeSong, tracks} = useSelector((state) => state.player);
    const {currentUser} = useAuth()
    const dispatch = useDispatch()
    const wrapperRef = useRef()
    const track = data.track
    const order = index + 1;

    const trackNameRef = useRef()

    const [image, setImage] = useState(track.album.images)
    const [artists, setArtists] = useState(track.album.artists)

    const seconds = ((track.duration_ms % 60000) / 1000).toFixed(0);
    const minutes = Math.floor(track.duration_ms / 60000) + ":" + (seconds < 10 ? '0' : '') + seconds;

    const imageUrl = image.find(item => item.height === 64)

    const artistName = artists.map(item => item.name)
    
    const handleClicked = () => {
        dispatch(setActiveSong({track, index}));
        dispatch(playPause(false))
    }

    const handleFavourite = async () => {
        const trackRef = doc(db, "tracks", currentUser.displayName)
        try {
            await setDoc(trackRef, 
                // trong watchlist co movie thi push them vao
                {track: tracks ? [...tracks, track.id] : [track.id]},
            )
            alert(`${track.name} added to Watchlist!`)
        } catch (error) {
            alert(`${track.name} fail to added to Watchlist!`)
        }
    }

    return ( 
        <div 
            ref={wrapperRef}
            className={
                activeSong === track.name ? cx('wrapper', 'active') : cx('wrapper')           
            } 
            onClick={handleClicked}
        >
            <span className={cx('wrapper-track--index')}>{order}</span>
            <div className={cx('wrapper-right')}>
                <div className={cx('wrapper-track--infor')}>              
                    <img src={imageUrl.url} className={cx('wrapper-track--infor-img')} alt={track.name}/>  
                    <div 
                        className={cx('wrapper-track-infor--main')} 
                    >
                        <span className={cx('wrapper-track--name')} ref={trackNameRef}>{track.name}</span>
                        <span className={cx('wrapper-track--artist')}>{artistName.join(", ")}</span>
                    </div>
                </div>         
                <span className={cx('wrapper-duration')}>{minutes}</span>
                <HiOutlineHeart className={cx('wrapper-track-heart')} onClick={handleFavourite}/>
            </div>          
        </div>
    );
}

export default Track;