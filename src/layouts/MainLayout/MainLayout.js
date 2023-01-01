import { useDispatch, useSelector } from 'react-redux';
import classname from 'classnames/bind'
import style from './MainLayout.module.scss'
import { useEffect, useRef, useState } from 'react';
import Search from '../../components/Search/Search';
import Slide from '../../components/Slide/Slide';
import Player from '../../components/Player/Player';
import PlayerBar from '../../components/PlayerBar/PlayBar';
import Categories from '../../components/Categories/Categories';
import Sidebar from '../Sidebar/Sidebar';
import TracksList from '../../components/TracksList/TracksList';
import { playerBar } from '../../redux/features/playerSlice';
import { useAuth } from '../../Context/AuthContext';
import MenuMobileButton from '../../components/MenuMobileButton/MenuMobileButton';
import SidebarMobile from '../SidebarMobile/SidebarMobile';
import { Link } from 'react-router-dom';

const cx = classname.bind(style)

function MainLayout() {

    const { token } = useAuth()

    const [track, setTrack] = useState([])
    const [order, setOrder] = useState()
    const [height, setHeight] = useState()
    const { activeSong, isPlaying, isActive} = useSelector((state) => state.player);
    const { active } = useSelector((state) => state.menuMobile);
    const dispatch = useDispatch()

    const wrapperMainRef = useRef()
    const wrapperMainBodyRight = useRef()
    const searchInputRef = useRef()
    const playerRef = useRef()
    const testRef = useRef()
    const slideRef = useRef()
    const listRef = useRef()

    useEffect(() => {  
        if (isActive && window.innerWidth >= 1480) {
            playerRef.current.style.display = 'block'
            wrapperMainRef.current.style.transform = 'translateX(32%)'
            searchInputRef.current.style.transform = 'translateX(-90%)'
            wrapperMainBodyRight.current.style.display = 'none'
        } 
        
        if (window.innerWidth < 1480) {
            dispatch(playerBar(true))
        }    
        
        setHeight(testRef.current.clientHeight - (slideRef.current.clientHeight + listRef.current.clientHeight))
    }, [isActive, dispatch])


    return ( 
        <div className={cx('wrapper', 'grid')}>
            <div className={cx('container', 'row no-gutters')}>
                <Sidebar/>
                <div ref={wrapperMainRef} className={cx('wrapper-main', 'col l-11 m-11 c-12')}>
                    <div className={cx('wrapper-main--header')}>
                        <h3 className={cx('header')}>Home</h3>      
                        <MenuMobileButton/>            
                        <div ref={searchInputRef} className={cx('wrapper-main--header-search')}>
                            <Search/>
                        </div>
                    </div>
                    <div className={cx('wrapper-main-body', 'grid row no-gutters')}>
                        <div ref={testRef} className={cx('wrapper-main-body--left', 'col l-8 m-8 c-12')}>
                            <div ref={slideRef} className={cx('slide-wrapper')}> 
                                <Slide className={cx('slide')} accessToken={token}/>
                            </div>                                                 
                            <div ref={listRef} className={cx('wrapper-music--list')}>
                                <h3 className={cx('wrapper-music--list-header')}>Trending</h3>
                                <TracksList 
                                    data={'37i9dQZEVXbMDoHDwVN2tF'} 
                                    accessToken={token}
                                />
                            </div>  
                            <div ref={playerRef} className={cx('wrapper-player')}>                                          
                                <Player 
                                    data={track} 
                                    index={order} 
                                />
                            </div>                        
                        </div>
                        <div ref={wrapperMainBodyRight} className={cx('wrapper-main-body--right', 'col l-4 m-4 c-12')}>
                            <div className={cx('wrapper-main-body--right-header')}>
                                <h3 className={cx('main-body--right-header')}>Category</h3>
                                <Link to='/categories' className={cx('expand')}>See more</Link>
                            </div>
                            <div className={cx('main-body--right-category')}>
                                <Categories accessToken={token}/>                           
                            </div>
                        </div>
                    </div>
                    <PlayerBar 
                        data={track} 
                        index={order} 
                        height={height}
                    /> 
                </div>
            </div>
            <SidebarMobile/>
        </div>  
    );
}

export default MainLayout;