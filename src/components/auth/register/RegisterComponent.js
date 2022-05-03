import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import '../../../assets/styles/_shared.scss';
import lockIcon from '../../../assets/svgs/icons/lock_grey.svg';
import userIcon from '../../../assets/svgs/icons/profile.svg';
import mailIcon from '../../../assets/svgs/icons/mail_grey.svg';
import confirmPassword from '../../../assets/svgs/icons/check_grey_o.svg';
import logo from '../../../assets/svgs/logo_iconOnly.svg';


const RegisterComponent = () => {
    // states

    function handleRegister() {

    }

    return (
        <div className={'generic-container flex-column-center-x'}>
            <div className={'generic-container-header'}>
                <img className={'logo-rounded'} src={logo}/>
            </div>

            <div>
                <div className={'generic-container-body'}>

                    <div className={'generic-container-body-email input-icon'}>
                        <input className={'input'} type={'email'} name={'userEmail'} placeholder={'Full Name'} onChange={(event)=>{}}/>
                        <img src={userIcon}/>
                    </div>

                    <div className={'generic-container-body-email input-icon'}>
                        <input className={'input'} type={'email'} name={'userEmail'} placeholder={'Email Address'} onChange={(event)=>{}}/>
                        <img src={mailIcon}/>
                    </div>

                    <div className={"input-icon"}>
                        <input className={'input'} type="password" placeholder={'Password'} onChange={(event)=>{}}/>
                        <img className={'input-icon-img'} src={lockIcon}/>
                    </div>

                    <div className={"input-icon"}>
                        <input className={'input'} type="password" placeholder={'Confirm Password'} onChange={(event)=>{}}/>
                        <img className={'input-icon-img'} src={confirmPassword}/>
                    </div>

                </div>


                <div className={'generic-container-action flex-column-center-y flex-column-center-x'}>
                    <button className={'generic-container-action-button button-primary text-bigger'} onClick={() => {console.log('asd')}}>Register</button>
                </div>


                <div className={'generic-container-bottom flex-row-center-x text-accent text-dark-grey'}>
                    Have an account? Login <Link className={'link generic-container-bottom-link'} to="/auth/login">here</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterComponent;