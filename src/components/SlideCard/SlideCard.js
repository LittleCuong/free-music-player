import axios from 'axios';
import classname from 'classnames/bind'
import style from './SlideCard.module.scss'
import { useEffect, useState } from 'react';
import { HiHome, HiHeart, HiUser, HiOutlineMusicNote, HiCollection } from "react-icons/hi";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const cx = classname.bind(style)

function SlideCard(data) {
    const album = data.data
    const [imgUrl, setImgUrl] = useState(album.images)

    const result = imgUrl.find((url) => {
        return url.height = 300
    })
    
    const imageUrl = result.url


    return ( 
        <div 
            className={cx('wrapper')} 
            style={
                {
                    backgroundImage: `url(${imageUrl})`,
                }
            }
        >
            <button className={cx('wrapper-button--explore')}>Explore now</button>   
        </div>
    );
}

export default SlideCard;