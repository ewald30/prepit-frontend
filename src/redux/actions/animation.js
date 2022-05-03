const ANIMATION = 'ANIMATION';
export const SET_ANIMATION = `${ANIMATION} Set animation`;

export const setAnimation = (payload) => {
    return {
        type: SET_ANIMATION,
        payload: payload
    }
}