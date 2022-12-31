import classname from 'classnames/bind'
import style from './PlaylistLayout.module.scss'
import { useEffect, useRef, useState } from 'react';
import Search from '../../components/Search/Search';
import Track from '../../components/Track/Track';
import TracksList from '../../components/TracksList/TracksList';
import Player from '../../components/Player/Player';
import Categories from '../../components/Categories/Categories';
import PlayerBar from '../../components/PlayerBar/PlayBar';
import spotifyApi from '../../api/spotifyApi';
import Sidebar from '../Sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';

const cx = classname.bind(style)

function PlaylistLayout() {
    
    const {token} = useAuth()
    const {playlistId} = useParams()
    const [name, setName] = useState()

    const wrapperMainRef = useRef()
    const wrapperMainBodyRight = useRef()
    const searchInputRef = useRef()
    const playerRef = useRef()
    const testRef = useRef()

    useEffect(() => {
        axios(`https://api.spotify.com/v1/playlists/${playlistId}`,
        {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        })
        .then(res => {
            setName(res.data.name)
        })
    }, [playlistId, token])

    return ( 
        <div className={cx('wrapper', 'grid')}>
            <div className={cx('container', 'row no-gutters')}>
                <Sidebar/>
                <div ref={wrapperMainRef} className={cx('wrapper-main', 'col l-11 m-11 c-12')}>
                    <div className={cx('wrapper-main--header')}>
                        <h3 className={cx('header')}>{name}</h3>
                        <div ref={searchInputRef} className={cx('wrapper-main--header-search')}>
                            <Search/>
                        </div>
                    </div>
                    <div className={cx('wrapper-main-body', 'grid row no-gutters')}>
                        <div ref={testRef} className={cx('wrapper-main-body--left', 'col l-8 m-8 c-12')}>                                              
                            <div className={cx('wrapper-music--list')}>
                                <div className={cx('wrapper-music--list-tracks')}>
                                    <TracksList data={playlistId} accessToken={token}/>
                                </div>
                            </div>  
                            <div ref={playerRef} className={cx('wrapper-player')}>                                          
                                <Player/>
                            </div>                        
                        </div>
                        <div ref={wrapperMainBodyRight} className={cx('wrapper-main-body--right', 'col l-4 m-4 c-12')}>
                            <h3 className={cx('main-body--right-header')}>Category</h3>
                            <div className={cx('main-body--right-category')}>
                                <Categories accessToken={token}/>                           
                            </div>
                        </div>
                    </div>
                    <PlayerBar/> 
                </div>
            </div>
        </div>  
    );
}

export default PlaylistLayout;