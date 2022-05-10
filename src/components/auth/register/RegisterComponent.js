import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import '../../../assets/styles/_shared.scss';
import lockIcon from '../../../assets/svgs/icons/lock_grey.svg';
import userIcon from '../../../assets/svgs/icons/profile.svg';
import mailIcon from '../../../assets/svgs/icons/mail_grey.svg';
import confirmPassword from '../../../assets/svgs/icons/check_grey_o.svg';
import logo from '../../../assets/svgs/logo_iconOnly.svg';
import { RegisterState } from "../../../core/auth";
import { register } from "../api";
import { BarLoader } from "react-spinners";
import './RegisterComponent.scss';



const RegisterComponent = (props) => {
    const [state, setState] = useState(RegisterState);
    const {pendingAuth} = state;

    function handleRegister() {
        setState({...state, pendingAuth: true});

        const name = state.fullName.split(" ");
        const firstName = name[0];
        const lastName = name[1];

        let canceled = false;


        authenticate();
        return () => {
            canceled = false;
        }

        async function authenticate() {
            try{
                const response = await register(state.email, 
                    firstName, 
                    lastName,
                    state.password,
                    state.passwordConfirmation)
                    setState({...state, pendingAuth: false, authenticationError: null});
                    props.handleModalEvent(true);

                console.log(response);
            } catch (error) {
                setState({...state, pendingAuth: false, authenticationError: error});
            }
        }
    }


    return (
        <div className={'generic-container flex-column-center-x flex-space-between register-component'}>
            <div className={'generic-container-header register-component-logo'}>
                <img className={'logo-rounded'} src={logo}/>
            </div>

            <div className="flex-column-center-x">
                <div className={'generic-container-body'}>

                    <div className={'generic-container-body-email input-icon'}>
                        <input className={'input'} type={'email'} name={'userEmail'} placeholder={'Full Name'} value={state.fullName} onChange={(event)=>{setState({...state, fullName: event.target.value})}}/>
                        <img src={userIcon}/>
                    </div>

                    <div className={'generic-container-body-email input-icon'}>
                        <input className={'input'} type={'email'} name={'userEmail'} placeholder={'Email Address'} value={state.email} onChange={(event)=>{setState({...state, email: event.target.value})}}/>
                        <img src={mailIcon}/>
                    </div>

                    <div className={"input-icon"}>
                        <input className={'input'} type="password" placeholder={'Password'} value={state.password} onChange={(event)=>{setState({...state, password: event.target.value})}}/>
                        <img className={'input-icon-img'} src={lockIcon}/>
                    </div>

                    <div className={"input-icon"}>
                        <input className={'input'} type="password" placeholder={'Confirm Password'} value={state.passwordConfirmation} onChange={(event)=>{setState({...state, passwordConfirmation: event.target.value})}}/>
                        <img className={'input-icon-img'} src={confirmPassword}/>
                    </div>

                </div>


                <div className={'generic-container-action flex-column-center-y flex-column-center-x'}>
                    <button className={'generic-container-action-button button-primary text-bigger register-component-cta'} onClick={handleRegister}> Register </button>
                </div>


                <div className={'generic-container-bottom flex-row-center-x text-accent text-dark-grey register-component-bottom-link'}>
                    Have an account? Login <Link className={'link generic-container-bottom-link'} to="/auth/login">here</Link>
                </div>

                {pendingAuth && <BarLoader width={150} height={5} color={'#29474A'} loading={pendingAuth}/>}

            </div>

        </div>
    )
}

export default RegisterComponent;