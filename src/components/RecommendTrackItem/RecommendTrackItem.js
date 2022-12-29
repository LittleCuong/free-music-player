import classname from 'classnames/bind'
import style from './RecommendTrackItem.module.scss'
import { memo, useEffect, useRef, useState } from 'react';
import { HiPlay } from "react-icons/hi2";
import { useSelector, useDispatch } from 'react-redux';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { setActiveSong, playPause } from '../../redux/features/playerSlice';


const cx = classname.bind(style)

function RecommendTrackItem({data, onClick, order}) {

    const track =  data
    const index = order
    const dispatch = useDispatch()
    const {currentIndex, currentSongs} = useSelector((state) => state.player)

    const [image, setImage] = useState()
    const [url, setUrl] = useState()
    const [artist, setArtist] = useState()

    const handleClick = () => {
        dispatch(setActiveSong({track, index}))
        dispatch(playPause(false));
    }

    useEffect(() => {
        if (data) {
            setImage(track.album.images)
            setArtist(track.artists.map(item => item.name))
        }
        if (image !== undefined) {
            setUrl(image.find(item => {
                if (item.width === 64) {
                    return item.url
                }
            }))
        }
    }, [data, image, track.album.images])

    return (                 
        <div className={cx('wrapper')} onClick={handleClick}>   
            <div className={cx('wrapper-image')}>
                <img className={cx('wrapper-background')} src={url?.url} alt={track.name}/>
            </div>               
            <div className={cx('wrapper-infor')}>
                <span className={cx('wrapper-infor--name')}>{track.name}</span>
                <span className={cx('wrapper-infor--artist')}>{artist?.join(',')}</span>
            </div>
            <div className={cx('wrapper-icon')}>
                <HiPlay className={cx('icon')}/>
            </div>        
        </div>        
    );
}

export default memo(RecommendTrackItem);