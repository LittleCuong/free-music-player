import classname from 'classnames/bind'
import style from './PlaylistDetail.module.scss'
import spotifyApi from '../../api/spotifyApi';
import { HiOutlineHeart } from "react-icons/hi";
import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'

const cx = classname.bind(style)

function PlaylistDetail({id}) {

    const auth = JSON.parse(localStorage.getItem('token'))
    const {playlists, currentUser, tracks} = useAuth()
    const [playlist, setPlaylists] = useState([])
    const [images, setImages] = useState([])
    
    const inFav = playlists.includes(playlist.id)

    useEffect(() => {
        const getPlaylist = async () => {
            const res = await spotifyApi.getPlaylist(id, auth)
            console.log(res);
            setPlaylists(res.data)
        }
        getPlaylist()
    }, [id])

    useEffect(() => {
        setImages(playlist.images)
    }, [playlist])

    const imageUrl = images?.find(item => item.url)

    const handleAddPlaylist = async () => {
        const playlistRef = doc(db, "playlists", currentUser.uid)
        try {
            await setDoc(playlistRef, 
                {playlist: playlists ? [...playlists, playlist.id] : [playlist.id]},
            )
            alert(`${playlist.name} added to Favourite!`)
        } catch (error) {
            alert(`${playlist.name} fail to added to Favourite!`)
        }
    }

    const handleRemove= async () => {
        const playlistRef = doc(db, "playlists", currentUser.uid)
        try {
            await setDoc(playlistRef, 
                {playlist: playlists.filter((item) => item !== playlist.id)},
                {merge: "true"}
            )
            alert(`${playlist.name} removed from Favourite!`)
        } catch (error) {
            alert(`${playlist.name} fail to removed from Favourite!`)
        }
    }

    return ( 
        <div className={cx('wrapper')} style={{backgroundColor: `${playlist.primary_color}`}}>
            <div className={cx('wrapper-image')}>
                <img src={imageUrl?.url} className={cx('image')}/>
            </div>
            <div className={cx('wrapper-infor')}>
                <h3 className={cx('wrapper-infor--name')}>About {playlist?.tracks?.items.length} songs</h3>
                <Tippy content='Add to favourite lists' offset={[0,1]} placement='bottom'>
                    <div style={{width: '20px'}}>
                        <HiOutlineHeart 
                            className={inFav ? cx('wrapper-infor--icon', 'saved') : cx('wrapper-infor--icon')} 
                            onClick={inFav ? handleRemove : handleAddPlaylist}
                        />
                    </div>
                </Tippy>
                
            </div>
          

        </div>
    );
}

export default PlaylistDetail;