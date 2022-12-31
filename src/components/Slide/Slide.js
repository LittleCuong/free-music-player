import classname from 'classnames/bind'
import style from './Slide.module.scss'
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination, Autoplay } from 'swiper';
import spotifyApi from '../../api/spotifyApi';
import SlideCard from '../SlideCard/SlideCard';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import { useAuth } from '../../Context/AuthContext';

const cx = classname.bind(style)

function Slide({className}) {

    const {token} = useAuth()
    const auth = JSON.parse(localStorage.getItem('token'))
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        const getNewRelease = async () => {
            const response = await spotifyApi.getNewRelease(auth)
            setAlbums(response.data.albums.items)
        } 
        getNewRelease()
    }, [auth])

    const classes = cx('wrapper', {
        [className]: className
    });

    return ( 
        <div className={classes}>
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={5}
                slidesPerView={1}
                grabCursor={true}
                autoplay={{
                    delay: 2000,                         
                }}
                loop
                pagination={{ clickable: true }}
            >
                {albums.map((album, index) => (
                    <SwiperSlide key={index}>                   
                        <SlideCard 
                            data={album} 
                            className={cx('slide-card')}
                        />             
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Slide;