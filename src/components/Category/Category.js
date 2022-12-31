import classname from 'classnames/bind'
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Category.module.scss'

const cx = classname.bind(style)


function Category(data) {
    const [icons, setIcons] = useState()
    const [url, setUrl] = useState()
    const wrapperRef = useRef()
    const textRef = useRef()

    const categoryPage = `/category/${data.data.id}`

    useEffect(() => {
        if (data.data) {
            setIcons(data.data.icons)
        }

        if (icons !== undefined) {
            setUrl(icons[0])
        }

        switch (data.page) {
            case 'discover':
                wrapperRef.current.style.height = '220px'
                wrapperRef.current.classList.add('col', 'l-2-4', 'm-3', 'c-4')
                wrapperRef.current.style.margin = '10px 10px'
                textRef.current.style.marginTop = '100px'
                textRef.current.style.fontSize = '1.4rem'

                if (window.innerWidth >= 400 && window.innerWidth <= 739) {
                    wrapperRef.current.style.height = '200px'
                    wrapperRef.current.style.margin = '10px 10px'
                    textRef.current.style.marginTop = '100px'
                    textRef.current.style.fontSize = '1rem'
                } else if (window.innerWidth >= 320 && window.innerWidth <= 399) {
                    wrapperRef.current.style.height = '160px'
                    wrapperRef.current.style.margin = '10px 10px'
                    textRef.current.style.marginTop = '100px'
                    textRef.current.style.fontSize = '0.8rem'
                } else if  (window.innerWidth <= 319) {
                    wrapperRef.current.style.height = '140px'
                    wrapperRef.current.style.margin = '10px 10px'
                    textRef.current.style.marginTop = '100px'
                    textRef.current.style.fontSize = '0.7rem' 
                }
                break;
            default:
                break;
        }
    }, [data.data, icons, data.page])

    return ( 
        <Link to={categoryPage} ref={wrapperRef} className={cx('wrapper')}>
            <div className={cx('container')} style={{backgroundImage: `url(${url?.url})`}}>
                <span ref={textRef} className={cx('container-name')}>{data.data.name}</span>
            </div>
        </Link>
    );
}

export default Category;