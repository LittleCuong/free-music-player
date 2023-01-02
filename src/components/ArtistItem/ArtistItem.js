import classname from 'classnames/bind'
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './ArtistItem.module.scss'

const cx = classname.bind(style)


function ArtistItem({data}) {

    const [value, setValue] = useState()
    const [images, setImages] = useState()

    useEffect(() => {
        setValue(data.find(item => item))   
    }, [data])

    useEffect(() => {
        if (value !== undefined) {
            setImages(value.images)
        }     
    }, [value])

    const imageUrl = images?.find(item => item.height === 160)

    return ( 
        <Link to={`/artist/${value?.id}`} className={cx('wrapper')}>
            <div className={cx('wrapper-image')}>
                <img className={cx('image')} src={imageUrl?.url}/>
            </div>
            <div className={cx('wrapper-infor')}>
                <span className={cx('wrapper-infor--name')}>{value?.name}</span>
                <span className={cx('wrapper-infor--fame')}>{value?.followers.total} followers</span>
            </div>
        </Link>
    );
}

export default ArtistItem;