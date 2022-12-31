import classname from 'classnames/bind'
import style from './SidebarMobile.module.scss'
import { HiHome, HiHeart, HiUser, HiOutlineMusicNote, HiCollection, HiArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenu } from '../../redux/features/menuButtonSlice';
import { useEffect, useRef } from 'react';

const cx = classname.bind(style)

function SidebarMobile() {

    const wrapperRef = useRef()

    const dispatch = useDispatch()
    const {active} = useSelector((state) => state.menuMobile)

    useEffect(() => {
        if (active) {
            wrapperRef.current.style.transform = 'translateX(0%)'
            wrapperRef.current.style.opacity = '1'
        } else {
            wrapperRef.current.style.transform = 'translateX(-100%)'
            wrapperRef.current.style.opacity = '0'
        }
    })

    const handleClose = () => {
        dispatch(setActiveMenu(false))
    }

    return ( 
        <div ref={wrapperRef} className={cx('wrapper')}>
            <HiArrowLeft className={cx('close-icon')} onClick={handleClose}/>
            <div className={cx('wrapper-sidebar--top')}>
                <div className={cx('wrapper-sidebar--icon')}>
                    <HiHome className={cx('sidebar-icon')}/>
                    <span className={cx('sidebar-item')}>Home</span>
                </div>
                <div className={cx('wrapper-sidebar--icon')}>
                    <HiOutlineMusicNote className={cx('sidebar-icon')}/>
                    <span className={cx('sidebar-item')}>Categories</span>
                </div>
                <div className={cx('wrapper-sidebar--icon')}>
                    <HiUser className={cx('sidebar-icon')}/>
                    <span className={cx('sidebar-item')}>Profile</span>
                </div>
                <div className={cx('wrapper-sidebar--icon')}>
                    <HiCollection className={cx('sidebar-icon')}/>
                    <span className={cx('sidebar-item')}>Collection</span>
                </div>
            </div>
            <div className={cx('wrapper-sidebar--bottom')}>
                <div className={cx('wrapper-sidebar--icon')}>
                    <HiHeart className={cx('sidebar-icon')}/>
                    <span className={cx('sidebar-item')}>Favourite</span>
                </div>
            </div>
        </div>
    );
}

export default SidebarMobile;