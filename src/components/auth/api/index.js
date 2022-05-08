import axios from 'axios';
import { withLogs } from '../../../resources/logging';
import {LOGIN_URL, headers, REGISTER_URL} from  '../../../resources/api/index';

export const login = (username, password) => {
    return withLogs(
        axios.post(LOGIN_URL,{username, password}, headers),
         'Login'
        );
}

export const register = (email, firstName, lastName,  password, passwordConfirmation) => {
    return withLogs(
        axios.post(REGISTER_URL, {
            email, firstName, lastName, password, passwordConfirmation, username: email
        }, headers), 
        'Register')
}

