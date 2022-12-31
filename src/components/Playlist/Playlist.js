import classname from 'classnames/bind'
import style from './Playlist.module.scss'
import spotifyApi from '../../api/spotifyApi';
import { HiPlay } from "react-icons/hi2";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classname.bind(style)

function Playlist({data}) {
    const track = data

    const url = `/${track.id}`
    const [image, setImage] = useState()
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        setImage(track.images)
    }, [track.images])

    useEffect(() => {
        if (image) {
            setImageUrl(image.find(item => item.url))
        }
    }, [image])

    return ( 
        <Link to={url} className={cx('wrapper')}>
            <div className={cx('wrapper-contain')}> 
                <img 
                    className={cx('wrapper-image')} 
                    // src={imageUrl.url} 
                    src={imageUrl?.url}
                    alt={data.name}
                />
                <div className={cx('wrapper-text')}>
                    <span className={cx('text')}>{data.name}</span>
                </div>
                <HiPlay className={cx('wrapper-icon')}/>
            </div>
        </Link>
    );
}

export default Playlist;