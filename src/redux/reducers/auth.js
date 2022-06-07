import { AUTH_LOG_OUT, AUTH_SESSION_EXPIRED, AUTH_SET_LOGGED_IN, AUTH_SET_SESSION_EXPIRED } from "../actions/auth";

const authState = {
    loggedIn: false,
    sessionExpired: false,
}

const authReducer = (state = authState, action) => {
    switch (action.type) {
        case AUTH_SET_LOGGED_IN:
            return {...state, loggedIn: action.payload};
        case AUTH_SET_SESSION_EXPIRED:
            return {...state, sessionExpired: action.payload};
        case AUTH_SESSION_EXPIRED:
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userInfo');
            return {...state, loggedIn: false, sessionExpired: true}
        case AUTH_LOG_OUT:
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('userInfo');
                return {...state, loggedIn: false, sessionExpired: false}
        default:
            return state;
    }
}

export default authReducer;