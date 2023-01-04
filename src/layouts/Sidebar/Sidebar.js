import { useState } from 'react';
import classname from 'classnames/bind'
import style from './Sidebar.module.scss'
import Tippy from '@tippyjs/react';
import { HiHome, HiHeart, HiUser, HiOutlineMusicNote, HiCollection, HiLogout } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { playerBar} from '../../redux/features/playerSlice';
import { useDispatch } from 'react-redux';
import { setActivePlayer } from '../../redux/features/playerSlice';

import 'tippy.js/dist/tippy.css'

const cx = classname.bind(style)

function Sidebar() {

    const { logout, signInWithGoogle, signInWithFacebook, currentUser } = useAuth()
    const nav = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()


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

    const handleHome = () => {
        nav('/free-music-player')
        dispatch(playerBar(false))
        dispatch(setActivePlayer(false))
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
        <div className={cx('wrapper-sidebar', 'col l-1 m-1 c-0')}>      
            <div className={cx('wrapper-sidebar--top')}>
                { currentUser                
                    ? 
                        <Tippy content={currentUser.displayName} placement='right'>
                            <div className={cx('wrapper-sidebar--icon')} onClick={handleSignIn}>
                                <img className={cx('wrapper-sidebar--avt')} src={currentUser.photoURL}/>
                            </div>
                        </Tippy>                   
                    :   
                        <Tippy content='Login' placement='right'>
                            <div className={cx('wrapper-sidebar--icon')} onClick={handleSignIn}>
                                <HiUser className={cx('sidebar-icon')}/>
                            </div>
                        </Tippy>                    
                }
                <Tippy content='Home' placement='right'>
                    <div className={cx('wrapper-sidebar--icon')}>
                        <HiHome className={cx('sidebar-icon')} onClick={handleHome}/>
                    </div>
                </Tippy>     
                <Tippy content='Collection' placement='right'>
                    <div className={cx('wrapper-sidebar--icon')}>
                        <HiOutlineMusicNote className={cx('sidebar-icon')} onClick={handleCategories}/>
                    </div>
                </Tippy>             
                <Tippy content='Collection' placement='right'>
                    <div className={cx('wrapper-sidebar--icon')}>
                        <HiCollection className={cx('sidebar-icon')} onClick={handleCollection}/>
                    </div>                       
                </Tippy>        
            </div>
            <div className={cx('wrapper-sidebar--bottom')}>
                <Tippy content='Favourite' placement='right'>
                    <div className={cx('wrapper-sidebar--icon')} onClick={handleFavourites}>
                        <HiHeart className={cx('sidebar-icon')}/>
                    </div> 
                </Tippy>    
                { currentUser 
                    ? 
                        <Tippy content='Logout' placement='right'>
                                <div className={cx('wrapper-sidebar--icon')} onClick={handleLogOut}>
                                    <HiLogout className={cx('sidebar-icon')}/>
                                </div>
                        </Tippy>               
                    :
                        null                    
                }               
            </div>             
        </div>
    );
}

export default Sidebar;