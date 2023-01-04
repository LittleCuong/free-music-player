import { useEffect, useState } from 'react';
import { setCurrentPlaylist, setPage } from '../../redux/features/playerSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classname from 'classnames/bind'
import style from './ArtistDetailLayout.module.scss'
import Search from '../../components/Search/Search';
import spotifyApi from '../../api/spotifyApi';
import Sidebar from '../Sidebar/Sidebar';
import MenuMobileButton from '../../components/MenuMobileButton/MenuMobileButton';
import SidebarMobile from '../SidebarMobile/SidebarMobile';
import Album from '../../components/Album/Album';
import ArtistTopTrack from '../../components/ArtistTopTrack/ArtistTopTrack';
import PlayBar from '../../components/PlayerBar/PlayBar';

const cx = classname.bind(style)

function ArtistDetailLayout() {

    const auth = JSON.parse(localStorage.getItem('token'))
    const {id} = useParams()
    const dispatch = useDispatch()
    
    const [data, setData] = useState()
    const [images, setImages] = useState()
    const [tracks, setTracks] = useState()
    const [albums, setAlbums] = useState()

    useEffect(() => {
        const getArtist = async () => {
            const res = await spotifyApi.getArtistDetails(id, auth)
            setData(res.data)
        }

        const getTracks = async () => {
            const res = await spotifyApi.getArtistsTopTracks(id, auth)
            setTracks(res.data.tracks)
            dispatch(setPage('artist'))
            dispatch(setCurrentPlaylist(res.data.tracks))
        }

        getArtist()
        getTracks()
    }, [id])
    
    useEffect(() => {
        if (data!== undefined) {
            setImages(data.images)
        }     
        if (data!== undefined) {
            const getAlbums = async () => {
                const res = await spotifyApi.getAlbums(data?.id, auth)
                setAlbums(res.data.items)
            }
            getAlbums()
        }
    }, [data])

    const imageUrl = images?.find(item => item.height = 640)
    const format = new Intl.NumberFormat()

    return ( 
        <div className={cx('wrapper', 'grid row no-gutters')}>
            <Sidebar/>
            <div className={cx('wrapper-main', 'col l-11 m-11 c-12')} >
                <div className={cx('wrapper-main--header')} style={{backgroundImage: `url(${imageUrl?.url})`}}>
                    <div 
                        className={cx('artist-infor')}
                    >
                        <span className={cx('artist-infor--name', 'span')}>{data?.name}</span>
                        <span className={cx('artist-infor--fame', 'span')}>{format.format(data?.followers.total)} followers</span>
                    </div> 
                    <MenuMobileButton/>
                    <div className={cx('wrapper-main--header-search')}>
                        <Search/>
                    </div>                   
                </div>
                <div className={cx('wrapper-main-body', 'grid row no-gutters')}>
                    <div className={cx('wrapper-main-body--right', 'col l-12 m-12 c-12')}>                        
                        <div className={cx('main-body--right-category')}>
                            <h3 className={cx('main-body--right-header')}>Popular</h3>
                            <div className={cx('divided')}>
                                <div className={cx('wrapper-list')}>
                                    <div className={cx('list--container')}>
                                        {tracks?.map((item, index) => 
                                            <ArtistTopTrack key={index} data={item} index={index}/>
                                        )}
                                    </div>
                                </div>
                                <h3 className={cx('wrapper-list--album-header')}>Albums</h3>
                                <div className={cx('wrapper-list--album')}>
                                    {albums?.map((item, index) => (
                                        <Album key={index} data={item}/>
                                    ))}
                                </div>
                            </div>
                            <PlayBar/>                         
                        </div>
                    </div> 
                </div>
            </div>
            <SidebarMobile/>
        </div>
    );
}

export default ArtistDetailLayout;