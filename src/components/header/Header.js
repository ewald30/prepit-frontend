import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logoTitle from '../../assets/svgs/logo_titleOnly.svg';
import './Header.scss';
import '../../assets/styles/_shared.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, sessionExpired, setLoggedIn } from '../../redux/actions/auth';
import NavbarMobile from '../navbarMobile/NavbarMobile';
import menuIcon from '../../assets/svgs/icons/menu_green.svg';
import logo from '../../assets/svgs/logo_iconOnly.svg';
import logInIcon from '../../assets/svgs/icons/log-in.svg';
import registerIcon from '../../assets/svgs/icons/user.svg';
import mealPlanIcon from '../../assets/svgs/icons/bowl.svg';
import homeIcon from '../../assets/svgs/icons/home-alt.svg'
import logOutIcon from '../../assets/svgs/icons/log-out.svg';
import userIcon from '../../assets/svgs/icons/profile-green.svg';
import collectionsIcon from '../../assets/svgs/icons/album.svg';
import aboutIcon from '../../assets/svgs/icons/info.svg'


const Header = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const dispatch = useDispatch();
    //todo:  add redux to update the header component 
    // creat a field with token in redux so these will be updated
    const {handleAnimation} = props;

    console.log("MENU OPEN", menuOpen);

    const handleLogOut = () => {
        dispatch(logOut());
        handleAnimation(true);
    }

    return (
        <header className="header flex-space-between">
            <div className="header-left flex-row flex-space-between">
                <div className={'header-logo-image'}>
                    <img className={'logo-rounded'} src={logo}/>
                </div>
                <Link to="/">
                    <img src={logoTitle} id={'header-logo'}/>
                </Link>
            </div>

            <div className="header-right flex-space-around text-bolder text-bigger-2">
                <div className="header-right-auth flex-space-around">
                    {!loggedIn && <Link to="/" className="link-header" onClick={() => {handleAnimation(true)}}>Home</Link>}
                    {!loggedIn && <Link to="/auth/login" className="link-header" onClick={() => {handleAnimation(true)}}>Log In</Link>}
                    {!loggedIn && <Link to="/auth/register" className="link-header" onClick={() => {handleAnimation(true)}}>Register</Link>}
                    {loggedIn && <Link to="/auth/my-profile" className="link-header" onClick={() => {handleAnimation(true)}}>My Profile</Link>}
                    {loggedIn && <Link to="/collections" className="link-header" onClick={() => {handleAnimation(true)}}>Collections</Link>}

                    {/* {loggedIn && <Link to="/devtools" className="link-header" onClick={() => {handleAnimation(true)}}>Dev tools</Link> }  */}
                    {/* <Link to="/browse" className="link-header" onClick={() => {handleAnimation(true)}}>Browse</Link> */}

                    <Link to="/meal/meal-plan" className="link-header" onClick={() => {handleAnimation(true)}}>Meal plan</Link>
                    <Link to="/about" className="link-header" onClick={() => {handleAnimation(true)}}>About</Link>
                    {loggedIn && <Link to="/" className="link-header" onClick={handleLogOut}>Log out</Link>}
                </div>

                <div className="header-right-mobile">
                    <img src={menuIcon} onClick={() =>setMenuOpen(true)}/>
                </div>
            </div>


                {menuOpen && <NavbarMobile className="header-navbar" isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
                    <div className="header-navbar-content flex-column-end-x text-bolder text-accent">
                        {!loggedIn && 
                            <Link to="/auth/login" onClick={() => {handleAnimation(true)}} className='flex-row flex-row-center-y header-navbar-content-item link-header'>
                                <div className="text-bigger header-navbar-content-item-label">Log In</div>
                                <img src={logInIcon} />
                            </Link>
                        }
                        {!loggedIn && 
                            <Link to="/auth/register" onClick={() => {handleAnimation(true)}} className='flex-row flex-row-center-y header-navbar-content-item link-header'>
                                <div to="/auth/register" className="text-bigger header-navbar-content-item-label">Register</div>
                                <img src={registerIcon}/>
                            </Link>
                         }


                        {loggedIn && 
                            <Link to="/auth/my-profile" onClick={() => {handleAnimation(true)}} className='flex-row flex-row-center-y header-navbar-content-item link-header'>
                                <div className="text-bigger header-navbar-content-item-label">My Profile</div>
                                <img src={userIcon}/>
                            </Link>
                        }
                        {loggedIn && 
                            <Link to="/collections" onClick={() => {handleAnimation(true)}} className='flex-row flex-row-center-y header-navbar-content-item link-header'>
                                <div className="text-bigger header-navbar-content-item-label">Collections</div>
                                <img src={collectionsIcon}/>
                            </Link>
                        }

                        {/* <Link to="/browse" className="link-header text-bigger" onClick={() => {handleAnimation(true)}}>Browse</Link> */}
                        {!loggedIn && 
                            <Link to="/" onClick={() => {handleAnimation(true)}} className='flex-row flex-row-center-y header-navbar-content-item link-header '>
                                <div to="/" className="text-bigger header-navbar-content-item-label">Home</div>
                                <img src={homeIcon}/>
                            </Link>
                        }

                        <Link to="/meal/meal-plan" onClick={() => {handleAnimation(true)}} className='flex-row flex-row-center-y header-navbar-content-item link-header'>
                            <div  className="text-bigger header-navbar-content-item-label">Meal plan</div>
                            <img src={mealPlanIcon}/>
                        </Link>

                        {loggedIn && 
                            <Link to="/" onClick={handleLogOut} className='flex-row flex-row-center-y header-navbar-content-item link-header '>
                                <div to="/" className="text-bigger header-navbar-content-item-label" onClick={handleLogOut}>Log out</div>
                                <img src={logOutIcon}/>
                            </Link>
                        }

                        <Link to="/about" onClick={() => {handleAnimation(true)}} className='flex-row flex-row-center-y header-navbar-content-item link-header '>
                            <div className="text-bigger header-navbar-content-item-label">About</div>
                            <img src={aboutIcon}/>
                        </Link>


                        {/* {loggedIn && <Link to="/devtools" className="link-header" onClick={() => {handleAnimation(true)}}>Dev tools</Link> }  */}
                    </div>
                </NavbarMobile>}
        </header>
    )
}

export default Header;