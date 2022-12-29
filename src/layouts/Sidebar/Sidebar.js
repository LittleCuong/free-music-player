import classname from 'classnames/bind'
import style from './Sidebar.module.scss'
import { HiHome, HiHeart, HiUser, HiOutlineMusicNote, HiCollection } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const cx = classname.bind(style)

function Sidebar() {

    const nav = useNavigate()

    const handleHome = () => {
        nav('/')
    }

    return ( 
        <div className={cx('wrapper-sidebar', 'col l-1 m-1 c-0')}>
            <div className={cx('wrapper-sidebar--top')}>
                <div className={cx('wrapper-sidebar--icon')}>
                    <HiOutlineMusicNote className={cx('sidebar-icon')}/>
                </div>
                <div className={cx('wrapper-sidebar--icon')}>
                    <HiHome className={cx('sidebar-icon')} onClick={handleHome}/>
                </div>
                <div className={cx('wrapper-sidebar--icon')}>
                    <HiOutlineMusicNote className={cx('sidebar-icon')}/>
                </div>
                <div className={cx('wrapper-sidebar--icon')}>
                    <HiUser className={cx('sidebar-icon')}/>
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