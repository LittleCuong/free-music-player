import classname from 'classnames/bind'
import style from './Slide.module.scss'
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination, Autoplay } from 'swiper';
import { setCurrentPlaylist } from '../../redux/features/playerSlice';
import spotifyApi from '../../api/spotifyApi';
import SlideCard from '../SlideCard/SlideCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import { useAuth } from '../../Context/AuthContext';
import { useDispatch } from 'react-redux';

const cx = classname.bind(style)

function Slide({className}) {
    const auth = JSON.parse(localStorage.getItem('token'))
    const [albums, setAlbums] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const getNewRelease = async () => {
            const response = await spotifyApi.getNewRelease(auth)
            console.log(response);
            setAlbums(response.data.albums.items)
            dispatch(setCurrentPlaylist(response.data.albums.items))
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