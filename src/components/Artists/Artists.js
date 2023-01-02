import axios from 'axios';
import classname from 'classnames/bind'
import { useEffect, useRef, useState } from 'react';
import spotifyApi from '../../api/spotifyApi';
import ArtistItem from '../ArtistItem/ArtistItem';
import style from './Artists.module.scss'

const cx = classname.bind(style)

function Artists() {
    // 1Xyo4u8uXC1ZmMpatF05PJ 1URnnhqYAYcrqrcwql10ft 06HL4z0CvFAxyc27GXpf02 3TVXtAsR1Inumwj472S9r4 2wY79sveU1sp5g7SokKOiI
    const auth = JSON.parse(localStorage.getItem('token'))
    const array = ['1Xyo4u8uXC1ZmMpatF05PJ', '1URnnhqYAYcrqrcwql10ft', '06HL4z0CvFAxyc27GXpf02', '3TVXtAsR1Inumwj472S9r4', '2wY79sveU1sp5g7SokKOiI']
    const artistArray = array.join('%');
    const [artists, setArtists] = useState()
    const [artist, setArtist] = useState()

    useEffect(() => {
        const getId = async () => {
            const promises = array.map(async (id) => {
                return await spotifyApi.getSeveralArtists(id, auth)
            })
            try {
                const result = await Promise.all(promises)   
                setArtists(result.map(item => item.data))
            } catch (err) {
                console.log(err)
            }
        }
        getId()
    }, [auth])

    return ( 
        <div className={cx('wrapper')}>
            {artists?.map((item, index)=> (                 
                <ArtistItem key={index} data={item.artists}/>
            ))}
        </div>
    );
}

export default Artists;