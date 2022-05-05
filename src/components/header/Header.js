import React from 'react';
import {Link} from 'react-router-dom';
import logoTitle from '../../assets/svgs/logo_titleOnly.svg';
import './Header.scss';
import '../../assets/styles/_shared.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../../redux/actions/auth';

const Header = (props) => {
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const dispatch = useDispatch();
    //todo:  add redux to update the header component 
    // creat a field with token in redux so these will be updated
    const {handleAnimation} = props;

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        dispatch(setLoggedIn(false));
        handleAnimation(true);
     }

    return (
        <header className="header flex-space-between">
            <div className="header-left">
                <img src={logoTitle} id={'header-logo'}/>
            </div>

            <div className="header-right flex-space-around">
                <div className="header-right-auth flex-space-around">
                    {!loggedIn && <Link to="/auth/login" className="link-header text-bigger" onClick={() => {handleAnimation(true)}}>Log In</Link>}
                    {!loggedIn && <Link to="/auth/register" className="link-header text-bigger" onClick={() => {handleAnimation(true)}}>Register</Link>}

                    {loggedIn && <Link to="/auth/my-profile" className="link-header text-bigger" onClick={() => {handleAnimation(true)}}>My Profile</Link>}
                    {loggedIn && <Link to="/auth/login" className="link-header text-bigger" onClick={handleLogOut}>Log out</Link>}

                    <Link to="/browse" className="link-header text-bigger" onClick={() => {handleAnimation(true)}}>Browse</Link>
                    <Link to="/meal-plan" className="link-header text-bigger" onClick={() => {handleAnimation(true)}}>Meal plan</Link>
                    <Link to="/about" className="link-header text-bigger" onClick={() => {handleAnimation(true)}}>About</Link>
                </div>
            </div>
        </header>
    )
}

export default Header;