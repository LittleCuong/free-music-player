import classname from 'classnames/bind'
import style from './FavouriteListLayout.module.scss'
import { useEffect, useRef, useState } from 'react';
import Search from '../../components/Search/Search';
import Categories from '../../components/Categories/Categories';
import spotifyApi from '../../api/spotifyApi';
import Sidebar from '../Sidebar/Sidebar';
import Playlist from '../../components/Playlist/Playlist';
import { useAuth } from '../../Context/AuthContext';
import MenuMobileButton from '../../components/MenuMobileButton/MenuMobileButton';
import SidebarMobile from '../SidebarMobile/SidebarMobile';

const cx = classname.bind(style)

function FavouriteListLayout() {

    const auth = JSON.parse(localStorage.getItem('token'))

    const { playlists } = useAuth()

    const [favouritePlaylists, setFavouritePlaylists] = useState([])

    useEffect(() => {
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
        getPlaylist()
    }, [playlists])

    const searchInputRef = useRef()

    return ( 
        <div className={cx('wrapper', 'grid row no-gutters')}>
            <Sidebar/>
            <div className={cx('wrapper-main', 'col l-11 m-11 c-12')}>
                <div className={cx('wrapper-main--header')}>
                    <h3 className={cx('header')}>Discover</h3>
                    <MenuMobileButton/>
                    <div ref={searchInputRef} className={cx('wrapper-main--header-search')}>
                        <Search/>
                    </div>
                </div>
                <div className={cx('wrapper-main-body', 'grid row no-gutters')}>
                    <div className={cx('wrapper-main-body--right', 'col l-12 m-12 c-12')}>                        
                        <div className={cx('main-body--right-category')}>
                            {favouritePlaylists?.map((item, index) => (
                                <Playlist data={item} key={index}/>
                            ))}                         
                        </div>
                    </div>
                </div>
            </div>
            <SidebarMobile/>
        </div>
    );
}

export default FavouriteListLayout;