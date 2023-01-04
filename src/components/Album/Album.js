import classname from 'classnames/bind'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Album.module.scss'
import { HiPlay } from "react-icons/hi2";

const cx = classname.bind(style)


function Album({data}) {

    const [image, setImage] = useState()

    useEffect(() => {
        setImage(data.images)
    }, [data.images])

    const imageUrl = image?.find(item => item.height = 64)

    return ( 
        <Link className={cx('wrapper')}>
        <div className={cx('wrapper-contain')}> 
            <img 
                className={cx('wrapper-image')} 
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

export default Album;