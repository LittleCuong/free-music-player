import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { playerBar } from '../../redux/features/playerSlice';

import classname from 'classnames/bind'
import style from './CategoryListLayout.module.scss'
import Search from '../../components/Search/Search';
import Categories from '../../components/Categories/Categories';
import Sidebar from '../Sidebar/Sidebar';
import MenuMobileButton from '../../components/MenuMobileButton/MenuMobileButton';
import SidebarMobile from '../SidebarMobile/SidebarMobile';

const cx = classname.bind(style)

function CategoryListLayout() {

    const searchInputRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(playerBar(false))
    }, [])


    return ( 
        <div className={cx('wrapper', 'grid row no-gutters')}>
            <Sidebar/>
            <div className={cx('wrapper-main', 'col l-11 m-11 c-12')}>
                <div className={cx('wrapper-main--header')}>
                    <h3 className={cx('header')}>Discover</h3>
                    <MenuMobileButton/>
                    <div ref={searchInputRef} className={cx('wrapper-main--header-search')}>
                        <Search/>
                    </div>
                </div>
                <div className={cx('wrapper-main-body', 'grid row no-gutters')}>
                    <div className={cx('wrapper-main-body--right', 'col l-12 m-12 c-12')}>                        
                        <div className={cx('main-body--right-category')}>
                            <Categories page={'discover'}/>                           
                        </div>
                    </div>
                </div>
            </div>
            <SidebarMobile/>
        </div>
    );
}

export default CategoryListLayout;