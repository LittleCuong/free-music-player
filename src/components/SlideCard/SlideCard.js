import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classname from 'classnames/bind'
import style from './SlideCard.module.scss'

const cx = classname.bind(style)

function SlideCard(data) {
    const album = data.data
    const [imgUrl, setImgUrl] = useState(album.images)
    const nav = useNavigate()

    const result = imgUrl.find((url) => {
        return url.height === 300
    })
    
    const imageUrl = result.url

    const handleClicked = () => {
        nav(`/album/tracks/${album.id}`)
    }

    const style = {backgroundImage: `url(${imageUrl})`}

    return ( 
        <div
            className={cx('wrapper')} 
            style={style}
        >
            
            <button 
                className={cx('wrapper-button--explore')} 
                onClick={handleClicked}
            >
                Explore now
            </button>   
        </div>
    );
}

export default SlideCard;