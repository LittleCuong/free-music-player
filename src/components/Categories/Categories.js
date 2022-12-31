import axios from 'axios';
import classname from 'classnames/bind'
import { useEffect, useRef, useState } from 'react';
import spotifyApi from '../../api/spotifyApi';
import Category from '../Category/Category';
import style from './Categories.module.scss'

const cx = classname.bind(style)

function Categories() {

    const wrapperRef = useRef()
    const auth = JSON.parse(localStorage.getItem('token'))
    const [category, setCategory] = useState()

    useEffect(() => {
        const getCategory = async () => {
            const res = await spotifyApi.getCategories(auth)
            setCategory(res.data.categories.items)
        }
        getCategory()

        if (window.innerWidth >= 1480) {
            wrapperRef.current.style.display = 'flex'
        }
    }, [auth])

    return ( 
        <div className={cx('wrapper')} ref={wrapperRef}>
            {category?.map((item, index)=> (                 
                    <Category key={index} data={item}/>
            ))}
        </div>
    );
}

export default Categories;