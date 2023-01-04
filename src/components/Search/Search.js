import axios from 'axios';
import classname from 'classnames/bind'
import style from './Search.module.scss'
import { useEffect, useState } from 'react';

const cx = classname.bind(style)

function Search() {
    return ( 
        <div className={cx('wrapper')}>
            <input className={cx('wrapper-input')} placeholder="What do you want to listen to?"/>
        </div>
    );
}

export default Search;