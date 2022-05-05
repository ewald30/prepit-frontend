import axios from 'axios';
import { withLogs } from '../../../resources/logging';
import {LOGIN_URL, headers} from  '../../../resources/api/index';

const login = (username, password) => {
    return withLogs(
        axios.post(LOGIN_URL,{username, password}, headers),
         'Login'
        );
}

export default login;