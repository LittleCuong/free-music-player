import classname from 'classnames/bind'
import style from './TracksList.module.scss'
import { useEffect, useState } from 'react';
import Track from '../../components/Track/Track';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../Context/AuthContext';
import { setCurrentPlaylist, setPage } from '../../redux/features/playerSlice';
import spotifyApi from '../../api/spotifyApi';

const cx = classname.bind(style)

function TracksList({data, page}) {

    const { token } = useAuth()
    const auth = JSON.parse(localStorage.getItem('token'))

    const dispatch = useDispatch()
    const [playlists, setPlaylists] = useState([])

    useEffect(() => { 
        if (page !== 'albumTracksPage') {
            const getList = async () => {
                const response = await spotifyApi.getPlaylist(data, auth)
                setPlaylists(response.data.tracks.items)
                dispatch(setPage('home'))
                dispatch(setCurrentPlaylist(response.data.tracks.items))
            } 
            getList()
        } else {
            const getList = async () => {
                const response = await spotifyApi.getAlbumTracks(data, auth)
                setPlaylists(response.data.items)
                dispatch(setCurrentPlaylist(response.data.items))
            } 
            getList()
        }
        
    }, [data, token, dispatch, page])



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