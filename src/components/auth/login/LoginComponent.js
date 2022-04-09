import React, {useEffect, useState} from "react";
import { AuthState } from "../../../core/auth";
import { Link } from "react-router-dom";
import login from "../api/index";
import './LoginComponent.scss';
import '../../../assets/styles/_shared.scss';
import logo from '../../../assets/svgs/logo_iconOnly.svg';
import lockGrey from '../../../assets/svgs/lock_grey.svg';
import userGrey from '../../../assets/svgs/user_grey.svg';


const LoginComponent = () => {
    const [state, setState] = useState(AuthState);
    const {email, password, pendingAuth} = state;


    function handleLogin(){
        setState({pendingAuth: true});
        let canceled = false;

        authenticate();
        return () => {
            canceled = false;
        }
        
        async function authenticate(){
            try{
                const response = await login(email, password);
                setState({pendingAuth: false});
    
                console.log(response);
                console.log('pendingAuth: ', pendingAuth)
            } catch (err) {
                setState({authenticationError: err});
                setState({pendingAuth: true});
            }
        }
    }

    


    return (
        <div className={'login-component flex-column-center-x'}>
            <div className={'login-component-header'}>
                <img className={'logo-rounded'} src={logo}/>
            </div>

            <div className={'login-component-container'}>
                <div className={'login-component-container-body'}>
                    <div className={'login-body-email input-icon'}>
                        <input className={'input'} type={'email'} name={'userEmail'} placeholder={'Username'} value={email} onChange={(event)=>{setState({...state, email: event.target.value})}}/>
                        <img src={userGrey}/>
                    </div>

                    <div className={"input-icon"}>
                        <input className={'input'} type="password" placeholder={'Password'} value={password} onChange={(event)=>{setState({...state, password: event.target.value})}}/>
                        <img className={'input-icon-img'} src={lockGrey}/>
                    </div>

                </div>

                <div className={'login-component-container-footer flex-column-center-y flex-column-center-x'}>
                    <button className={'login-component-footer-button button-primary text-bigger'} onClick={handleLogin}>Login</button>
                    <div className={'text-dark-grey'}>Forgot password</div>
                </div>


                <div className={'login-component-container-bottom flex-row-center-x text-accent text-dark-grey'}>
                    Don't have an account? Register <Link className={'link login-component-container-bottom-link'} to="/auth/register">here</Link>
                </div>
            </div>
 

            {pendingAuth && <div>PENDING AUTHEENTICATIOON !!!!</div>}
        </div>
    )
}

export default LoginComponent;