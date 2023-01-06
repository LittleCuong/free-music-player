import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import classname from 'classnames/bind'
import style from './ArtistItem.module.scss'

const cx = classname.bind(style)


function ArtistItem({data}) {
    const [value, setValue] = useState()
    const [images, setImages] = useState()

    const format = new Intl.NumberFormat()

    useEffect(() => {
        if (data.name) {
            setValue(data)
        } else {
            setValue(data.find(item => item))   

        }
    }, [data])

    useEffect(() => {
        if (value !== undefined) {
            setImages(value.images)
        }     
    }, [value])

    const imageUrl = images?.find(item => item.height === 160 || 60 )

    return ( 
        <Link to={`/artist/${value?.id}`} className={cx('wrapper')}>
            <div className={cx('wrapper-image')}>
                <img className={cx('image')} src={imageUrl?.url}/>
            </div>
            <div className={cx('wrapper-infor')}>
                <span className={cx('wrapper-infor--name')}>{value?.name}</span>
                <span className={cx('wrapper-infor--fame')}>{format.format(value?.followers.total)} followers</span>
            </div>
        </Link>
    );
}

export default ArtistItem;