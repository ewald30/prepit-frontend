import React from 'react';
import Modal from '../modal/Modal';
import close from '../../assets/svgs/icons/close.svg';
import  ReactDOM  from 'react-dom';
import './NavbarMobile.scss';


const NavbarMobile = ({isOpen, onClose, children}) => {
    console.log('navbarMobile')
    if (!isOpen) return null

    return ReactDOM.createPortal(
        <div className='overlay-navbar'>
            <div className="mobile-navbar">
                <button className='mobile-navbar-close' onClick={onClose}><img src={close}/></button>
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    )

}

export default NavbarMobile;