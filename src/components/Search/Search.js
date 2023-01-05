import axios from 'axios';
import classname from 'classnames/bind'
import style from './Search.module.scss'
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';

import {AiOutlineSearch, AiOutlineCloseCircle, AiOutlineLoading} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';


const cx = classname.bind(style)

function Search() {

    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()
    const nav = useNavigate()
    
    // Debounced
    const debouncedValue = useDebounce(searchValue, 500)

    useEffect(() => {
        // if (!debouncedValue.trim()) {
        //     setSearchResult([])
        //     return
        // }

        // fetch (`https://api.themoviedb.org/3/search/multi?api_key=973d45784769b5e834721b303dbfc386&language=en-US&query=${searchValue}&page=1&include_adult=false`)
        //     .then ((res) => res.json())
        //     .then ((res) => {
        //         if (!res.results) {
        //             console.log(res.results);
        //             setSearchResult([])
        //         } else {               
        //         setSearchResult(res.results)
        //         setLoading(false)
        //         }
        //     })
        //     .catch ((error) => {
        //         console.log(error);
        //     })
    }, [searchValue])

    const handleSearching = () => {
        if (searchValue === '') {
            console.log('Please! Check your input');
        } else {
            nav(`/search/${searchValue}`)
        }
    }

    const handleClear = () => {
        setSearchValue('')
        inputRef.current.focus()
    }




    return ( 
        // <HeadlessTippy
        //     interactive
        //     placement='bottom-end'
        //     visible={showResult && searchResult.length > 0}
        //     onClickOutside={handleHideResult}
        //     render={attrs => (                                    
        //         <div className={cx('search-result', 'grid')} tabIndex="-1" {...attrs}>
        //             {searchResult?.map(item => (
        //                 <span>item</span>
        //             ))}
        //         </div>                                       
        //     )}
        // >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    type='text' 
                    placeholder='What do you want to listen to?' 
                    className={cx('input')}     
                    onChange={(e) => setSearchValue(e.target.value)}  
                    // onFocus={() => setShowResult(true)}                  
                ></input>                   
                {!!searchValue && !loading && (
                    <AiOutlineCloseCircle 
                        className={cx('delete-icon')} 
                        onClick={handleClear}
                    />
                )}
                {/* {loading && (
                    <AiOutlineLoading className={cx('loading-icon')} /> 
                )} */}
                <span className={cx('divider')}></span>
                <AiOutlineSearch className={cx('icon-search')} onClick={handleSearching}/>
            </div>
        // </HeadlessTippy>
    );
}

export default Search;