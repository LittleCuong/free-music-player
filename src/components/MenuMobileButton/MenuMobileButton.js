import { useDispatch } from 'react-redux';
import { HiMenuAlt2 } from "react-icons/hi";
import { setActiveMenu } from '../../redux/features/menuButtonSlice';

import classname from 'classnames/bind'
import style from './MenuMobileButton.module.scss'


const cx = classname.bind(style)

function MenuMobileButton() {

    const dispatch = useDispatch()

    const handleClickButton = () => {
        dispatch(setActiveMenu(true))
    }

    return ( 
        <div className={cx('burger-btn')} onClick={handleClickButton}>
            <HiMenuAlt2 className={cx('burger-icon')}/>
        </div>
    );
}

export default MenuMobileButton;