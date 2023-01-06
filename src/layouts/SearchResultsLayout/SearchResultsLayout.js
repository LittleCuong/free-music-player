import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../Context/AuthContext';
import { useParams } from 'react-router-dom';
import { setCurrentPlaylist } from '../../redux/features/playerSlice';

import classname from 'classnames/bind'
import style from './SearchResultsLayout.module.scss'
import Search from '../../components/Search/Search';
import PlayerBar from '../../components/PlayerBar/PlayBar';
import Sidebar from '../Sidebar/Sidebar';
import MenuMobileButton from '../../components/MenuMobileButton/MenuMobileButton';
import SidebarMobile from '../SidebarMobile/SidebarMobile';
import spotifyApi from '../../api/spotifyApi';
import ArtistItem from '../../components/ArtistItem/ArtistItem';
import ResultTrack from '../../components/ResultTrack/ResultTrack';


const cx = classname.bind(style)

function SearchResultsLayout() {

    const auth = JSON.parse(localStorage.getItem('token'))
    const {string} = useParams()

    const dispatch = useDispatch()

    const { currentUser } = useAuth()
    const [tracks, setTracks] = useState()
    const [artists, setArtists] = useState()

    useEffect(() => {  
        const getResult = async () => {
            const res = await spotifyApi.getResults(string, auth)
            console.log(res);
            setTracks(res.data.tracks.items)
            setArtists(res.data.artists.items)
            dispatch(setCurrentPlaylist(res.data.tracks.items))
        }
        getResult()
    }, [string])
    
    return ( 
        <div className={cx('wrapper', 'grid')}>
            <div className={cx('container', 'row no-gutters')}>
                <Sidebar/>
                <div className={cx('wrapper-main', 'col l-11 m-11 c-12')}>
                    <div className={cx('wrapper-main--header')}>
                        <h3 className={cx('header')}></h3>      
                        <MenuMobileButton/>            
                        <div  className={cx('wrapper-main--header-search')}>
                            <Search/>
                        </div>
                    </div>
                    <div className={cx('wrapper-main-body')}>
                        <div className={cx('wrapper-main-body--tracks')}>
                            <h3 className={cx('wrapper-main-body--header')}>Top result</h3>
                            {tracks?.map((item, index) => (
                                <ResultTrack key={item.id} index={index} data={item}/>
                            ))}
                        </div>
                        <div className={cx('wrapper-main-body--right')}>
                            <h3 className={cx('wrapper-main-body--header')}>Top artists</h3>
                            <div className={cx('wrapper-main-body--artists-list')}>
                                {artists?.map(item => (
                                    <ArtistItem key={item.id} data={item}/> 
                                ))}
                            </div>
                        </div>
                    </div>
                    <PlayerBar page={'result'}/> 
                </div>
            </div>
            <SidebarMobile/>
        </div>  
    );
}

export default SearchResultsLayout;