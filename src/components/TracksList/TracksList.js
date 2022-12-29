import classname from 'classnames/bind'
import style from './TracksList.module.scss'
import { useEffect, useRef, useState } from 'react';
import { HiHome, HiHeart, HiUser, HiOutlineMusicNote, HiCollection } from "react-icons/hi";
import Track from '../../components/Track/Track';
import spotifyApi from '../../api/spotifyApi';
import { useSelector } from 'react-redux';
import { logDOM } from '@testing-library/react';

const cx = classname.bind(style)

function TracksList({data, callback}) {

    const [playlists, setPlaylists] = useState([])
    const [chooseTrack, setChooseTrack] = useState(false)
    const [track, setTrack] = useState([])
    const [order, setOrder] = useState()
    const [isRandom, setIsRandom] = useState(false)
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    useEffect(() => {
        const getList = async () => {
            const response = await spotifyApi.getPlaylist(data)
            setPlaylists(response.tracks.items)
        }
        getList()
    }, [data])

    // const handleChooseTrack = (value, index) => {
    //     callback(value, index)
    //     // dispatch(currentSongs(e.target.value))
    // }

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-tracks-list')}>
                {playlists.map((playlist, index) => (
                    <Track
                        // onClick={handleChooseTrack}
                        key={index} 
                        index={index} 
                        data={playlist}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                    />                                 
                ))}
            </div>
        </div>  
    );
}

export default TracksList;