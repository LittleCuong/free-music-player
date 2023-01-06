import axios from 'axios';
import classname from 'classnames/bind'
import style from './SlideCard.module.scss'
import { useEffect, useState } from 'react';
import { HiHome, HiHeart, HiUser, HiOutlineMusicNote, HiCollection } from "react-icons/hi";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link, useNavigate } from 'react-router-dom';

const cx = classname.bind(style)

function SlideCard(data) {
    const album = data.data
    const [imgUrl, setImgUrl] = useState(album.images)
    const nav = useNavigate()

    const result = imgUrl.find((url) => {
        return url.height == 300
    })
    
    const imageUrl = result.url

    const handleClicked = () => {
        nav(`/album/tracks/${album.id}`)
    }

    const style = {backgroundImage: `url(${imageUrl})`}

    return ( 
        <div 
            className={cx('wrapper')} 
            // style={
            //     {
            //         backgroundImage: `url(${imageUrl})`,
            //     }
            // }
            style={style}
            onClick={handleClicked}
        >
            <button className={cx('wrapper-button--explore')}>Explore now</button>   
        </div>
    );
}

export default SlideCard;