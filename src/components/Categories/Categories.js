import classname from 'classnames/bind'
import { useEffect, useRef, useState } from 'react';
import spotifyApi from '../../api/spotifyApi';
import Category from '../Category/Category';
import style from './Categories.module.scss'

const cx = classname.bind(style)

function Categories() {

    const wrapperRef = useRef()

    const [category, setCategory] = useState()

    useEffect(() => {
        if (window.innerWidth >= 1480) {
            wrapperRef.current.style.display = 'flex'
        }

        const getCategories = async () => {
            const response = await spotifyApi.getCategories()
            setCategory(response.categories.items)
        }
        getCategories()
    }, [])

    return ( 
        <div className={cx('wrapper')} ref={wrapperRef}>
            {category?.map((item, index)=> (
                <Category key={index} data={item}/>
            ))}
        </div>
    );
}

export default Categories;