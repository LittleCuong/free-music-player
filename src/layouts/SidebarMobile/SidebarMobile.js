import classname from 'classnames/bind'
import style from './SidebarMobile.module.scss'
import { HiHome, HiHeart, HiUser, HiOutlineMusicNote, HiCollection, HiArrowLeft, HiLogout } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenu } from '../../redux/features/menuButtonSlice';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const cx = classname.bind(style)

function SidebarMobile() {

    const nav = useNavigate()
    const wrapperRef = useRef()

    const dispatch = useDispatch()
    const { logout, signInWithGoogle, signInWithFacebook, currentUser } = useAuth()
    const {active} = useSelector((state) => state.menuMobile)

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (active) {
            wrapperRef.current.style.transform = 'translateX(0%)'
            wrapperRef.current.style.opacity = '1'
        } else {
            wrapperRef.current.style.transform = 'translateX(-100%)'
            wrapperRef.current.style.opacity = '0'
        }
    })

    
    const handleSignIn = async () => {
        try {
            setError('')
            setLoading(true)
            await signInWithGoogle()
        } catch {
            setError('Faile to sign up')
        }

        setLoading(false)
    }

    const handleClose = () => {
        dispatch(setActiveMenu(false))
    }

    const handleHome = () => {
        nav('/free-music-player')
    }

    const handleFavourites = () => {      
        if (currentUser) {
            nav('/favourites')
        } else {
            alert("You must login first!")
        }  
    }

    const handleCategories =() => {
        nav('/categories')
    }

    const handleCollection = () => {
        if (currentUser) {
            nav('/playlists')
        } else {
            alert("You must login first!")
        }  
    }

    async function handleLogOut() {
        try {
            await logout()
            nav('/free-music-player')
        } catch (error) {
            console.log("Fail to logout");
        }
    }

    return ( 
        <div ref={wrapperRef} className={cx('wrapper')}>
            <HiArrowLeft className={cx('close-icon')} onClick={handleClose}/>
            <div className={cx('wrapper-sidebar--top')}>
                { currentUser 
                    ?   <div className={cx('wrapper-sidebar--icon')} onClick={handleSignIn}>
                            <img className={cx('wrapper-sidebar--avt')} src={currentUser.photoURL}/>
                        </div>
                    :   <div className={cx('wrapper-sidebar--icon')} onClick={handleSignIn}>
                            <HiUser className={cx('sidebar-icon')}/>
                            <span className={cx('sidebar-item')}>Login</span>
                        </div>
                }
                <div className={cx('wrapper-sidebar--icon')} onClick={handleHome}>
                    <HiHome className={cx('sidebar-icon')}/>
                    <span className={cx('sidebar-item')}>Home</span>
                </div>
                <div className={cx('wrapper-sidebar--icon')}>
                    <HiOutlineMusicNote className={cx('sidebar-icon')} onClick={handleCategories}/>
                    <span className={cx('sidebar-item')}>Categories</span>
                </div>
                <div className={cx('wrapper-sidebar--icon')}>
                    <HiCollection className={cx('sidebar-icon')} onClick={handleCollection}/>
                    <span className={cx('sidebar-item')}>Collection</span>
                </div>
            </div>
            <div className={cx('wrapper-sidebar--bottom')}>
                <div className={cx('wrapper-sidebar--icon')} onClick={handleFavourites}>
                    <HiHeart className={cx('sidebar-icon')}/>
                    <span className={cx('sidebar-item')}>Favourite</span>
                </div>
                <div className={cx('wrapper-sidebar--icon')} onClick={handleLogOut}>
                    <HiLogout className={cx('sidebar-icon')}/>
                    <span className={cx('sidebar-item')}>Log out</span>
                </div>
            </div>
        </div>
    );
}

export default SidebarMobile;