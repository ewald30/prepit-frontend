import React, { useEffect, useState } from 'react'
import invalidIcon from '../../../assets/svgs/icons/close_red.svg';
import validIcon from '../../../assets/svgs/icons/check.svg';
import './RegisterComponent.scss';

const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
const PASSWORD_REGEXP_UPPERCASE_CHARACTER = /(?=.*[A-Z])/;
const PASSWORD_REGEXP_SPECIAL_CHARACTER = /(?=.*[!@#$&*])/;
const PASSWORD_REGEXP_NUMBER = /(?=.*[0-9].*[0-9])/;
const PASSWORD_REGEXP_LOWERCASE_CHARACTER = /(?=.*[a-z].*[a-z].*[a-z])/;
const PASSWORD_NUMBER_OF_CHARACTERS = 8;

export default function RegisterPasswordRequirements({password}) {
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const errors = {};
        if(!password){
            return;
        }

        if (!PASSWORD_REGEXP_UPPERCASE_CHARACTER.test(password)){
            errors.upperCase="INVALID"
        }

        if (!PASSWORD_REGEXP_SPECIAL_CHARACTER.test(password)){
            errors.specialCase="INVALID"
        }

        if (!PASSWORD_REGEXP_NUMBER.test(password)){
            errors.digits="INVALID"
        }

        if (!PASSWORD_REGEXP_LOWERCASE_CHARACTER.test(password)){
            errors.lowerCase="INVALID"
        }

        if (password.length < PASSWORD_NUMBER_OF_CHARACTERS){
            errors.totalNumber="INVALID"
        }

        setErrors(errors);

    }, [password])

    if(Object.keys(errors).length == 0){
        return null;
    }

    return (
        <div className="input-error-password-requirements flex-column-start-x">
            <div className="input-error-password-requirements-label">The password should contain at least</div>
            <div className="input-error-password-requirements-rule">{errors.upperCase ? <img src={invalidIcon} id={'password-invalid'}/> : <img src={validIcon} id={'password-valid'}/>} 1 upper case character</div>
            <div className="input-error-password-requirements-rule">{errors.specialCase ? <img src={invalidIcon} id={'password-invalid'}/> : <img src={validIcon} id={'password-valid'}/>} 1 special character (! @ # $ & *) </div>
            <div className="input-error-password-requirements-rule">{errors.digits ? <img src={invalidIcon} id={'password-invalid'}/> : <img src={validIcon} id={'password-valid'}/>} 2 digits</div>
            <div className="input-error-password-requirements-rule">{errors.lowerCase ? <img src={invalidIcon} id={'password-invalid'}/> : <img src={validIcon} id={'password-valid'}/>} 3 lowercase letters</div>
            <div className="input-error-password-requirements-rule">{errors.totalNumber ? <img src={invalidIcon} id={'password-invalid'}/> : <img src={validIcon} id={'password-valid'}/>} a total of at least 8 characters</div>
        </div>
    )
}
