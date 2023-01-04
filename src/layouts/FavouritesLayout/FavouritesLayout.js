import { useDispatch, useSelector } from 'react-redux';
import classname from 'classnames/bind'
import style from './FavouritesLayout.module.scss'
import { useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import PlayerBar from '../../components/PlayerBar/PlayBar';
import Sidebar from '../Sidebar/Sidebar';
import { setBoolean, setCurrentPlaylist, setPage } from '../../redux/features/playerSlice';
import { useAuth } from '../../Context/AuthContext';
import MenuMobileButton from '../../components/MenuMobileButton/MenuMobileButton';
import SidebarMobile from '../SidebarMobile/SidebarMobile';
import axios from 'axios';
import FavouriteTrack from '../../components/FavouriteTrack/FavouriteTrack';


const cx = classname.bind(style)

function FavouritesLayout() {

    const auth = JSON.parse(localStorage.getItem('token'))

    const dispatch = useDispatch()

    const { tracks, currentUser} = useAuth()
    const { currentPlaylist, favourite } = useSelector((state) => state.player);

    const [favouritePlaylists, setFavouritePlaylists] = useState([])
    const [favouriteTracks, setFavouriteTracks] = useState([])
    
    useEffect(() => {  
        dispatch(setBoolean(true));

        const getId = async () => {
            const promises = tracks.map(async (id) => {
                return await axios({
                    method: "get",
                    baseURL: "https://api.spotify.com/v1/",
                    url: `tracks/${id}`,
                    headers: { 'Authorization' : 'Bearer ' + auth}
                })
            })
            try {
                const result = await Promise.all(promises)   
                dispatch(setCurrentPlaylist(result))        
                dispatch(setPage('favourite'))
                setFavouriteTracks(result.map(item => item.data))
            } catch (err) {
                console.log(err)
            }
        }

        getId()    
    
    }, [tracks])

    return ( 
        <div className={cx('wrapper', 'grid')}>
            <div className={cx('container', 'row no-gutters')}>
                <Sidebar/>
                <div className={cx('wrapper-main', 'col l-11 m-11 c-12')}>
                    <div className={cx('wrapper-main--header')}>
                        <h3 className={cx('header')}>Liked songs</h3>      
                        <MenuMobileButton/>            
                        <div  className={cx('wrapper-main--header-search')}>
                            <Search/>
                        </div>
                    </div>
                    <div className={cx('wrapper-main-body', 'grid row no-gutters')}>
                        <div className={cx('wrapper-background')}>
                            <span className={cx('list-header')}>{currentUser.displayName}</span>
                            <span className={cx('list-header')}>-</span>
                            <span className={cx('list-header')}>{tracks.length} songs</span>
                        </div>
                        <div className={cx('wrapper-main-body', 'col l-12 m-12 c-12')}>                                                                   
                            <div className={cx('wrapper-music--list')}>
                                {
                                    tracks.length == 0 
                                        ? 
                                            <span className={cx('list-header')}>Empty</span>
                                        :
                                            <div className={cx('track-list')}>
                                                {favouriteTracks?.map((item, index) => (
                                                    <FavouriteTrack data={item} key={index} index={index}/>
                                                ))}
                                        </div>
                                }                               
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

export default FavouritesLayout;