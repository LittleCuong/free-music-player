import { useDispatch, useSelector } from 'react-redux';
import classname from 'classnames/bind'
import style from './FavouritesLayout.module.scss'
import { useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import PlayerBar from '../../components/PlayerBar/PlayBar';
import Sidebar from '../Sidebar/Sidebar';
import { setBoolean, setCurrentPlaylist } from '../../redux/features/playerSlice';
import { useAuth } from '../../Context/AuthContext';
import MenuMobileButton from '../../components/MenuMobileButton/MenuMobileButton';
import SidebarMobile from '../SidebarMobile/SidebarMobile';
import axios from 'axios';
import FavouriteTrack from '../../components/FavouriteTrack/FavouriteTrack';
import spotifyApi from '../../api/spotifyApi';
import Categories from '../../components/Categories/Categories';
import { Link } from 'react-router-dom';


const cx = classname.bind(style)

function FavouritesLayout() {

    const auth = JSON.parse(localStorage.getItem('token'))

    const dispatch = useDispatch()

    const { playlists, tracks } = useAuth()
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
                setFavouriteTracks(result.map(item => item.data))
            } catch (err) {
                console.log(err)
            }
        }

        const getPlaylist = async () => {
            const promises = playlists.map(async (id) => {
                return await spotifyApi.getPlaylist(id, auth)
            })
            try {
                const result = await Promise.all(promises)         
                console.log(result);
                setFavouritePlaylists(result.map(item => item.data))
            } catch (err) {
                console.log(err)
            }
        }

        getId()    
        getPlaylist()
    

    }, [tracks, playlists])

    // useEffect(() => {
    //     dispatch(setCurrentPlaylist(favouriteTracks));
    // })

    return ( 
        <div className={cx('wrapper', 'grid')}>
            <div className={cx('container', 'row no-gutters')}>
                <Sidebar/>
                <div className={cx('wrapper-main', 'col l-11 m-11 c-12')}>
                    <div className={cx('wrapper-main--header')}>
                        <h3 className={cx('header')}>Favourites</h3>      
                        <MenuMobileButton/>            
                        <div  className={cx('wrapper-main--header-search')}>
                            <Search/>
                        </div>
                    </div>
                    <div className={cx('wrapper-main-body', 'grid row no-gutters')}>
                        <div className={cx('wrapper-main-body--left', 'col l-8 m-8 c-12')}>                                                                   
                            <div className={cx('wrapper-music--list')}>
                                <h3 className={cx('wrapper-music--list-header')}>Tracks</h3>
                                <div className={cx('track-list')}>
                                    {favouriteTracks?.map((item, index) => (
                                        <FavouriteTrack data={item} key={index} index={index}/>
                                    ))}
                                </div>
                            </div>                   
                        </div>
                        <div className={cx('wrapper-main-body--right', 'col l-4 m-4 c-12')}>
                        <div className={cx('wrapper-main-body--right-header')}>
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
            </div>
            <SidebarMobile/>
        </div>  
    );
}

export default FavouritesLayout;