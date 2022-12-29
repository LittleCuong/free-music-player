import classname from 'classnames/bind'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Category.module.scss'

const cx = classname.bind(style)


function Category(data) {
    const [icons, setIcons] = useState()
    const [url, setUrl] = useState()

    const categoryPage = `/category/${data.data.id}`

    useEffect(() => {
        if (data.data) {
            setIcons(data.data.icons)
        }

        if (icons !== undefined) {
            setUrl(icons[0])
        }
    }, [data.data, icons])

    return ( 
        <Link to={categoryPage} className={cx('wrapper')}>
            <div className={cx('container')} style={{backgroundImage: `url(${url?.url})`}}>
                <span className={cx('container-name')}>{data.data.name}</span>
            </div>
        </Link>
    );
}

export default Category;