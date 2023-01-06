import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import { playerBar } from '../../redux/features/playerSlice';
import { setActiveMenu } from '../../redux/features/menuButtonSlice';

import classname from 'classnames/bind'
import style from './PlaylistLayout.module.scss'
import Search from '../../components/Search/Search';
import TracksList from '../../components/TracksList/TracksList';
import Player from '../../components/Player/Player';
import Categories from '../../components/Categories/Categories';
import PlayerBar from '../../components/PlayerBar/PlayBar';
import Sidebar from '../Sidebar/Sidebar';
import spotifyApi from '../../api/spotifyApi';
import MenuMobileButton from '../../components/MenuMobileButton/MenuMobileButton';
import SidebarMobile from '../SidebarMobile/SidebarMobile';
import PlaylistDetail from '../../components/PlaylistDetail/PlaylistDetail';

const cx = classname.bind(style)

function PlaylistLayout() {

    const dispatch = useDispatch()
    const auth = JSON.parse(localStorage.getItem('token'))

    const { activePlayer } = useSelector((state) => state.player);
    const {active} = useSelector((state) => state.menuMobile)
    const {token} = useAuth()
    const {playlistId} = useParams()
    const [name, setName] = useState()
    const searchInputRef = useRef()
    
    useEffect(() => {
        dispatch(playerBar(true))

        const getList = async () => {
            const response = await spotifyApi.getPlaylist(playlistId, auth)
            setName(response.data.name)
        } 
        getList()
    }, [playlistId, auth, activePlayer])

    const handleClickOutside = () => {
        if (active === true) {
            dispatch(setActiveMenu(false))
        }
    }

    return ( 
        <div className={cx('wrapper', 'grid')} onClick={handleClickOutside}>
            <div className={cx('container', 'row no-gutters')}>
                <Sidebar/>
                <div className={cx('wrapper-main', 'col l-11 m-11 c-12')}>
                    <div className={cx('wrapper-main--header')}>
                        <h3 className={cx('header')}>{name}</h3>
                        <MenuMobileButton/>
                        <div ref={searchInputRef} className={cx('wrapper-main--header-search')}>
                            <Search/>
                        </div>
                    </div>
                    <div className={cx('wrapper-main-body', 'grid row no-gutters')}>
                        <div className={cx('wrapper-main-body--left', 'col l-8 m-8 c-12')}>                                              
                            <div className={cx('wrapper-music--list')}>
                                <div className={cx('wrapper-music--list-tracks')}>
                                    <TracksList data={playlistId}/>
                                </div>
                            </div>                     
                        </div>
                        <div className={cx('wrapper-main-body--right', 'col l-4 m-4 c-0')}>
                            <PlaylistDetail id={playlistId}/>
                            <div className={cx('wrapper-main-body--right-header')}>
                                <h3 className={cx('main-body--right-header')}>Category</h3>
                                <Link to='/categories' className={cx('expand')}>See more</Link>
                            </div>
                            <div className={cx('main-body--right-category')}>
                                <Categories accessToken={token}/>                           
                            </div>
                        </div>
                    </div>
                    <PlayerBar/>
                </div>
            </div>
            <SidebarMobile/>
        </div>  
    );
}

export default PlaylistLayout;