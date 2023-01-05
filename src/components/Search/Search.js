import axios from 'axios';
import classname from 'classnames/bind'
import style from './Search.module.scss'
import { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';

import {AiOutlineSearch, AiOutlineCloseCircle, AiOutlineLoading} from 'react-icons/ai'


const cx = classname.bind(style)

function Search() {

    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()

    // CLear input
    const handleClear = () => {
        setSearchValue('')
        inputRef.current.focus()
    }

    // Hide Result when click outside
    const handleHideResult = () => {
        setShowResult(false)
    }

    return ( 
        <HeadlessTippy
            interactive
            placement='bottom-end'
            visible={showResult && searchResult.length > 0}
            onClickOutside={handleHideResult}
            render={attrs => (                                    
                <div className={cx('search-result', 'grid')} tabIndex="-1" {...attrs}>
                    {searchResult?.map(item => (
                        <span>item</span>
                    ))}
                </div>                                       
            )}
        >
            {/* <div className={cx('wrapper')}>
                <input 
                    value={searchValue}
                    ref={inputRef} 
                    type='text' 
                    placeholder="What do you want to listen to?"
                    className={cx('wrapper-input')} 
                    onChange={(e) => setSearchValue(e.target.value)}  
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <AiOutlineCloseCircle className={cx('delete-icon')} onClick={handleClear}/>
                )}
                {loading && (
                    <AiOutlineLoading className={cx('loading-icon')} /> 
                )}                       
                <span className={cx('divider')}></span>
                <AiOutlineSearch className={cx('icon-search')}/>
            </div> */}
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    type='text' 
                    placeholder='What do you want to listen to?' 
                    className={cx('input')}     
                    onChange={(e) => setSearchValue(e.target.value)}  
                    onFocus={() => setShowResult(true)}
                    
                ></input>                   
                {!!searchValue && !loading && (
                    <AiOutlineCloseCircle 
                        className={cx('delete-icon')} 
                        onClick={handleClear}
                    />
                )}
                {loading && (
                    <AiOutlineLoading className={cx('loading-icon')} /> 
                )}
                <span className={cx('divider')}></span>
                <AiOutlineSearch className={cx('icon-search')}/>
            </div>
        </HeadlessTippy>
    );
}

export default Search;