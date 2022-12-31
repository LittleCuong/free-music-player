import { useState } from 'react';
import classname from 'classnames/bind'
import style from './Sidebar.module.scss'
import { HiHome, HiHeart, HiUser, HiOutlineMusicNote, HiCollection } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const cx = classname.bind(style)

function Sidebar() {

    const { logout, signInWithGoogle, signInWithFacebook, currentUser } = useAuth()
    console.log(currentUser);
    const nav = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

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
    }

    return ( 
        <div className={cx('wrapper-sidebar', 'col l-1 m-1 c-0')}>      
            <div className={cx('wrapper-sidebar--top')}>
                { currentUser 
                    ?   <div className={cx('wrapper-sidebar--icon')} onClick={handleSignIn}>
                            <img className={cx('wrapper-sidebar--avt')} src={currentUser.photoURL}/>
                        </div>
                    :   <div className={cx('wrapper-sidebar--icon')} onClick={handleSignIn}>
                            <HiUser className={cx('sidebar-icon')}/>
                        </div>
                }
                
                <div className={cx('wrapper-sidebar--icon')}>
                    <HiHome className={cx('sidebar-icon')} onClick={handleHome}/>
                </div>
                <div className={cx('wrapper-sidebar--icon')}>
                    <HiOutlineMusicNote className={cx('sidebar-icon')}/>
                </div>
                <div className={cx('wrapper-sidebar--icon')}>
                    <HiCollection className={cx('sidebar-icon')}/>
                </div>
            </div>
            <div className={cx('wrapper-sidebar--bottom')}>
                <div className={cx('wrapper-sidebar--icon')}>
                    <HiHeart className={cx('sidebar-icon')}/>
                </div>
            </div>             
        </div>
    );
}

export default Sidebar;