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

const cx = classname.bind(style)

function PlaylistLayout() {

    const {playlistId} = useParams()

    const [name, setName] = useState()
    const [playlists, setPlaylists] = useState([])
    const [chooseTrack, setChooseTrack] = useState(false)
    const [track, setTrack] = useState([])
    const [order, setOrder] = useState()
    const [isRandom, setIsRandom] = useState(false)

    const wrapperMainRef = useRef()
    const wrapperMainBodyRight = useRef()
    const searchInputRef = useRef()
    const playerRef = useRef()
    const testRef = useRef()
    const windowWidth = window.innerWidth

    useEffect(() => {
        const getTrending = async () => {
            const response = await spotifyApi.getPlaylist(playlistId)
            console.log(response);
            setPlaylists(response.tracks.items)
            setName(response.name)
        }
        getTrending()
    }, [playlistId])

    const handleChooseTrack = (data, index) => {
        setChooseTrack(true)
        setOrder(index)
        setTrack(data)
        if (window.innerWidth >= 1480) {
            playerRef.current.style.display = 'block'
            wrapperMainRef.current.style.transform = 'translateX(32%)'
            searchInputRef.current.style.transform = 'translateX(-90%)'
            wrapperMainBodyRight.current.style.display = 'none'
        }
    }

    const handleHidePlayer = () => {
        setChooseTrack(false)
        if (window.innerWidth >= 1480) {
            playerRef.current.style.display = 'none'
            wrapperMainRef.current.style.transform = 'translateX(0)'
            searchInputRef.current.style.transform = 'translateX(0%)'
            wrapperMainBodyRight.current.style.display = 'block'
        }
    }

    const handleControlTrack = (index, action) => {
        const current = index - 1
        switch (action) {
            case 'random':
                setIsRandom(!isRandom)
                break;
            case 'prev':
                if (isRandom) {
                    let number= Math.floor(Math.random()*current)    
                    const randomTrack = playlists.at(number)
                    setOrder(current)
                    setTrack(randomTrack.track)                                               
                } else {
                    const prevTrack = playlists.at(current - 1)
                    setOrder(index - 1)
                    setTrack(prevTrack.track)               
                }
                break;
            case 'forward':
                if (isRandom) {
                    let number= Math.floor(Math.random()*(playlists.length - current) + current)   
                    const randomTrack = playlists.at(number)
                    setOrder(current)
                    setTrack(randomTrack.track)                           
                } else {
                    console.log(index);
                    if (index !== playlists.length) {
                        const nextTrack = playlists.at(current + 1)
                        setOrder(index + 1)
                        setTrack(nextTrack.track)
                    } else {                      
                        const firstTrack = playlists.at(0)
                        setOrder(0)
                        setTrack(firstTrack.track)
                    }                   
                }
                break;          
            default:
                console.log('nothing');
            }
    }

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
                                    <TracksList data={playlistId} callback={handleChooseTrack}/>
                                </div>
                            </div>  
                            <div ref={playerRef} className={cx('wrapper-player')}>                                          
                                <Player data={track} isChoosen={chooseTrack} index={order} onClick={handleControlTrack} random={isRandom}/>
                            </div>                        
                        </div>
                        <div ref={wrapperMainBodyRight} className={cx('wrapper-main-body--right', 'col l-4 m-4 c-12')}>
                            <h3 className={cx('main-body--right-header')}>Category</h3>
                            <div className={cx('main-body--right-category')}>
                                <Categories/>                           
                            </div>
                        </div>
                    </div>
                    <PlayerBar data={track} index={order} onClick={handleControlTrack} random={isRandom}/> 
                </div>
            </div>
        </div>  
    );
}

export default PlaylistLayout;