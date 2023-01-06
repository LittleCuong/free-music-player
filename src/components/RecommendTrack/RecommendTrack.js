import { memo, useEffect, useState } from 'react';
import { useAuth } from "../../Context/AuthContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination, Autoplay } from 'swiper';
import { useSelector, useDispatch } from 'react-redux';

import classname from 'classnames/bind'
import style from './RecommendTrack.module.scss'
import RecommendTrackItem from '../RecommendTrackItem/RecommendTrackItem';

import spotifyApi from '../../api/spotifyApi';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';


const cx = classname.bind(style)

function RecommendTrack({index}) {
    const order = index
    
    const { token } = useAuth()

    const dispatch = useDispatch()
    const { currentSongs, isPlaying } = useSelector((state) => state.player)
    const [artists, setArtists] = useState()
    const [artist, setArtist] = useState()
    const [tracks, setTracks] = useState()

    useEffect(() => {
        if (artist) {
            const array = artist.join('?')
            const getRecommend = async () => {
                const response = await spotifyApi.getArtistsTopTracks(array, token)
                setTracks(response.data.tracks)
                console.log(response);
            }
            getRecommend()
        }
    }, [artist])

    useEffect(() => {
        setArtists(currentSongs.artists)
    }, [currentSongs])

    useEffect(() => {
        if (artists !== undefined) {
            setArtist(artists.map(item => item.id))     
        }
    }, [artists])



    return ( 
        <div className={cx('wrapper')}>
            <h3 className={cx('wrapper-header')}>Recommend</h3>
            <div className={cx('wrapper-body')}>
                <div className={cx('wrapper-body--list')}>
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={1}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                    > 
                        {tracks?.map((track, index) => (                                                
                            <SwiperSlide key={index} className={cx('slide')} >   
                                <RecommendTrackItem key={index} data={track} order={order}/>
                            </SwiperSlide>             
                        ))} 
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default memo(RecommendTrack);