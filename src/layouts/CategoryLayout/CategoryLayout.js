import classname from 'classnames/bind'
import style from './CategoryLayout.module.scss'
import { useEffect, useRef, useState } from 'react';
import Search from '../../components/Search/Search';
import Track from '../../components/Track/Track';
import Player from '../../components/Player/Player';
import Categories from '../../components/Categories/Categories';
import PlayerBar from '../../components/PlayerBar/PlayBar';
import spotifyApi from '../../api/spotifyApi';
import Sidebar from '../Sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Playlist from '../../components/Playlist/Playlist';

const cx = classname.bind(style)

function CategoryLayout() {

    const {id} = useParams()

    const [playlists, setPlaylists] = useState([])

    const searchInputRef = useRef()

    useEffect(() => {
        const getCategoryPlaylist = async () => {
            const response = await spotifyApi.getCategoryPlaylist(id)
            setPlaylists(response.playlists.items)
        }
        getCategoryPlaylist()
    }, [id])

    return ( 
        <div className={cx('wrapper', 'grid row no-gutters')}>
            <Sidebar/>
            <div className={cx('wrapper-main', 'col l-11 m-11 c-12')}>
                <div className={cx('wrapper-main--header')}>
                    <h3 className={cx('header')}>Top Tracks</h3>
                    <div ref={searchInputRef} className={cx('wrapper-main--header-search')}>
                        <Search/>
                    </div>
                </div>
                <div className={cx('wrapper-main-body', 'grid row no-gutters')}>
                    <div className={cx('wrapper-main-body--left', 'col l-8 m-8 c-12')}>                                           
                        <div className={cx('wrapper-music--list')}>
                            <div className={cx('wrapper-music--list-tracks', 'row sm-gutter')}>
                                {playlists.map((playlist, index) => (
                                    <Playlist
                                        key={index} 
                                        data={playlist}
                                        category={id}
                                    />                                 
                                ))}
                            </div>
                        </div>                         
                    </div>
                    <div className={cx('wrapper-main-body--right', 'col l-4 m-4 c-0')}>
                        <h3 className={cx('main-body--right-header')}>Category</h3>
                        <div className={cx('main-body--right-category')}>
                            <Categories/>                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryLayout;