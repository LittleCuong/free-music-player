import classname from 'classnames/bind'
import style from './Search.module.scss'
import { useRef, useState } from 'react';

import {AiOutlineSearch, AiOutlineCloseCircle, AiOutlineLoading} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';


const cx = classname.bind(style)

function Search() {

    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()
    const nav = useNavigate()

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
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    type='text' 
                    placeholder='What do you want to listen to?' 
                    className={cx('input')}     
                    onChange={(e) => setSearchValue(e.target.value)}           
                ></input>                 
                {!!searchValue && !loading && (
                    <AiOutlineCloseCircle 
                        className={cx('delete-icon')} 
                        onClick={handleClear}
                    />
                )}
                <span className={cx('divider')}></span>
                <AiOutlineSearch className={cx('icon-search')} onClick={handleSearching}/>
            </div>
    );
}

export default Search;