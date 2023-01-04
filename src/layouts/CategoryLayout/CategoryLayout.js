import classname from 'classnames/bind'
import style from './CategoryLayout.module.scss'
import { useEffect, useRef, useState } from 'react';
import Search from '../../components/Search/Search';
import Categories from '../../components/Categories/Categories';
import spotifyApi from '../../api/spotifyApi';
import Sidebar from '../Sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import Playlist from '../../components/Playlist/Playlist';
import { useAuth } from '../../Context/AuthContext';
import MenuMobileButton from '../../components/MenuMobileButton/MenuMobileButton';
import SidebarMobile from '../SidebarMobile/SidebarMobile';
import { Link } from 'react-router-dom';
import PlayerBar from '../../components/PlayerBar/PlayBar';
import axios from 'axios';

const cx = classname.bind(style)

function CategoryLayout() {

    const {token} = useAuth()
    const auth = JSON.parse(localStorage.getItem('token'))
    const {id} = useParams()
    const [playlists, setPlaylists] = useState([])

    const searchInputRef = useRef()

    useEffect(() => {
        const getCategoryPlaylist = async () => {
            const response = await spotifyApi.getCategoryPlaylist(id, auth)
            setPlaylists(response.data.playlists.items)          
        }
        getCategoryPlaylist()
    }, [id, auth])

    return ( 
        <div className={cx('wrapper', 'grid row no-gutters')}>
            <Sidebar/>
            <div className={cx('wrapper-main', 'col l-11 m-11 c-12')}>
                <div className={cx('wrapper-main--header')}>
                    <h3 className={cx('header')}>Explore</h3>
                    <MenuMobileButton/>
                    <div ref={searchInputRef} className={cx('wrapper-main--header-search')}>
                        <Search/>
                    </div>
                </div>
                <div className={cx('wrapper-main-body', 'grid row no-gutters')}>
                    <div className={cx('wrapper-main-body--left', 'col l-8 m-8 c-12')}>                                           
                        <div className={cx('wrapper-music--list')}>
                            <div className={cx('wrapper-music--list-tracks')}>
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
                        <div className={cx('wrapper-main-body--right')}>
                            <h3 className={cx('main-body--right-header')}>Category</h3>
                            <Link to='/categories' className={cx('expand')}>See more</Link>
                        </div>
                        <div className={cx('main-body--right-category')}>
                            <Categories/>                           
                        </div>
                    </div>
                </div>
                <PlayerBar/> 
            </div>
            <SidebarMobile/>
        </div>
    );
}

export default CategoryLayout;