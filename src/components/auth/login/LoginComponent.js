import React, {useEffect, useState} from "react";
import { AuthState } from "../../../core/auth";
import { Link, useNavigate } from "react-router-dom";
import {login} from "../api/index";
import './LoginComponent.scss';
import '../../../assets/styles/_shared.scss';
import logo from '../../../assets/svgs/logo_iconOnly.svg';
import lockGrey from '../../../assets/svgs/icons/lock_grey.svg';
import userGrey from '../../../assets/svgs/icons/profile.svg';
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../../redux/actions/auth";
import { BarLoader } from "react-spinners";
import { validateLoginForm } from "../../../resources/validation/loginValidation";
import { getUserInfo } from "../../../api/user/userApi";
import { authRequestWrapper } from "../../../api/auth/auth";


const LoginComponent = () => {

    const dispatch = useDispatch();
    const [state, setState] = useState(AuthState);
    const [formErrors, setFormErrors] = useState({}); 
    const {email, password, pendingAuth, authenticationError} = state;
    const navigate = useNavigate();

    function handleLogin(){
        // check to see if there are any validation errors
        const errors = validateLoginForm({email, password});
        setFormErrors(errors);

        // if there are errors, stop the registration process
        if(Object.keys(errors).length !== 0){
            return;
        }

        setState({pendingAuth: true});
        let canceled = false;

        authenticate();
        return () => {
            canceled = false;
        }
        
        async function authenticate(){
            try{
                const response = await login(email, password);  
                const {jwtToken, refreshToken} = response;
                localStorage.setItem('token', jwtToken);                                   // set token to localStorage
                localStorage.setItem('refreshToken', refreshToken);                                   // set token to localStorage

                const getUserInfoWrapped = authRequestWrapper(getUserInfo);         // includes both auth headers + refresh token if needed
                const userInfo = await getUserInfoWrapped();                              // get the response from the server
                setState({...state, pendingAuth: false, authenticationError: null});    // set pending to false and error to null
                localStorage.setItem('userInfo', JSON.stringify(userInfo));

                dispatch(setLoggedIn(true)); 
                navigate('/meal/meal-plan')                                                  // redirect to another page
            } catch (err) {
                setState({...state, pendingAuth: false, authenticationError: err});
            }
        }
    }

    


    return (
        
        <div className={'generic-container flex-column-center-x login-component'}>
            <div className={'generic-container-header login-component-logo'}>
                <img className={'logo-rounded '} src={logo}/>
            </div>

            <div>
                <div className={'generic-container-body'}>
                    <div className={'generic-container-body-email input-icon'}>
                        <input className={formErrors.email? "input input-error" : "input"} type={'email'} name={'userEmail'} placeholder={'Email'} value={email} onChange={(event)=>{setState({...state, email: event.target.value})}}/>
                        <img src={userGrey}/>
                        {formErrors.email && <div className="generic-container-error">{formErrors.email}</div>}

                    </div>

                    <div className={"input-icon"}>
                        <input className={formErrors.password? "input input-error" : "input"}  type="password" placeholder={'Password'} value={password} onChange={(event)=>{setState({...state, password: event.target.value})}}/>
                        <img className={'input-icon-img'} src={lockGrey}/>
                        {formErrors.password && <div className="generic-container-error">{formErrors.password}</div>}
                    </div>

                    {authenticationError && <div className={'text-red text-center'}> The email or password is invalid.</div>}


                </div>

                <div className={'generic-container-action flex-column-center-y flex-column-center-x'}>
                    <button className={'generic-container-action-button button-primary text-bigger login-component-cta'} onClick={handleLogin}>Login</button>
                    {/* <div className={'text-dark-grey'}>Forgot password</div> */}
                </div>


                <div className={'generic-container-bottom flex-row-center-x text-accent text-dark-grey login-component-bottom-link'}>
                    Don't have an account? <Link className={'link generic-container-bottom-link'} to="/auth/register">Register</Link>
                </div>
            </div>
 
            {pendingAuth && <BarLoader width={150} height={5} color={'#29474A'} loading={pendingAuth}/>}
        </div>
    )
}

export default LoginComponent;