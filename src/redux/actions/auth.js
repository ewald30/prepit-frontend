const AUTH = `AUTH`;
export const AUTH_SET_LOGGED_IN = `${AUTH} Set logged in`;
export const AUTH_SET_SESSION_EXPIRED = `${AUTH} Set session expired`;
export const AUTH_SESSION_EXPIRED = `${AUTH} Session expired`;
export const AUTH_LOG_OUT = `${AUTH} Log out`

export const setLoggedIn = (payload) => {
    return {
        type: AUTH_SET_LOGGED_IN,
        payload: payload
    }
}

export const setSessionExpired = (payload) => {
    return {
        type: AUTH_SET_SESSION_EXPIRED,
        payload: payload
    }
}

export const logOut = (payload) => {
    return {
        type: AUTH_LOG_OUT,
        payload: payload
    }
}

export const sessionExpired = (payload) => {
    return{
        type: AUTH_SESSION_EXPIRED,
        payload: payload
    }
}