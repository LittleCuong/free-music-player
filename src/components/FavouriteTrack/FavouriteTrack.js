import { HiOutlineHeart } from "react-icons/hi";
import classname from 'classnames/bind'
import style from './FavouriteTrack.module.scss'
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { playerBar, playPause, setActiveSong } from '../../redux/features/playerSlice';
import { useAuth } from "../../Context/AuthContext";

const cx = classname.bind(style)

function FavouriteTrack({data, index}) {
    const { activeSong } = useSelector((state) => state.player);

    const {tracks} = useAuth()
    const track = data
    const inFav = tracks.includes(track.id)
    const {currentUser} = useAuth()
    const dispatch = useDispatch()
    const wrapperRef = useRef()
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
        dispatch(playerBar(true))
        dispatch(playPause(false))
        console.log(index);
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
                        <span className={cx('wrapper-track--artist')}>{artistName.join(", ")}</span>
                    </div>
                </div>         
                <span className={cx('wrapper-duration')}>{minutes}</span>
                <HiOutlineHeart 
                    className={inFav ? cx('wrapper-track-heart', 'saved') : cx('wrapper-track-heart')} 
                    onClick={handleRemove}
                />
            </div>          
        </div>
    );
}

export default FavouriteTrack;