import { AUTH_SET_LOGGED_IN } from "../actions/auth";

const authState = {
    loggedIn: false,
}

const authReducer = (state = authState, action) => {
    switch (action.type) {
        case AUTH_SET_LOGGED_IN:
            return {...state, loggedIn: action.payload};
        default:
            return state;
    }
}

export default authReducer;