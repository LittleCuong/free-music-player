import classname from 'classnames/bind'
import style from './TracksList.module.scss'
import { useEffect, useState } from 'react';
import Track from '../../components/Track/Track';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';
import { setCurrentPlaylist, setPage } from '../../redux/features/playerSlice';
import spotifyApi from '../../api/spotifyApi';


const cx = classname.bind(style)

function TracksList({data}) {

    const { token } = useAuth()
    const auth = JSON.parse(localStorage.getItem('token'))

    const dispatch = useDispatch()
    const [playlists, setPlaylists] = useState([])
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    useEffect(() => { 
        const getList = async () => {
            const response = await spotifyApi.getPlaylist(data, auth)
            setPlaylists(response.data.tracks.items)
            dispatch(setPage('home'))
            dispatch(setCurrentPlaylist(response.data.tracks.items))
        } 
        getList()
    }, [data, token, dispatch])



    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-tracks-list')}>
                {playlists.map((playlist, index) => (
                    <Track
                        key={index} 
                        index={index} 
                        data={playlist}
                    />                                 
                ))}
            </div>
        </div>  
    );
}

export default TracksList;