const AUTH = `AUTH`;
export const AUTH_SET_LOGGED_IN = `${AUTH} Set logged in`;

export const setLoggedIn = (payload) => {
    return {
        type: AUTH_SET_LOGGED_IN,
        payload: payload
    }
}