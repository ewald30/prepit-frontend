import React from 'react';
import {Link} from 'react-router-dom';
import logoTitle from '../../assets/svgs/logo_titleOnly.svg';
import './Header.scss';
import '../../assets/styles/_shared.scss';

const Header = () => {
    return (
        <header className="header flex-space-between">
            <div className="header-left">
                <img src={logoTitle} id={'header-logo'}/>
            </div>

            <div className="header-right flex-space-around">
                <div className="header-right-auth flex-space-around">
                    <Link to="/auth/login" className="link-header text-bigger">Log In</Link>
                    <Link to="/auth/register" className="link-header text-bigger">Register</Link>
                    <Link to="/browse" className="link-header text-bigger">Browse</Link>
                    <Link to="/meal-plan" className="link-header text-bigger">Meal plan</Link>
                    <Link to="/about" className="link-header text-bigger">About</Link>
                </div>
            </div>
        </header>
    )
}

export default Header;