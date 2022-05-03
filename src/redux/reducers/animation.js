import { SET_ANIMATION } from "../actions/animation";

const animationState = {
    playAnimation: false,
}

const animationReducer = (state = animationState, action) => {
    switch (action.type) {
        case SET_ANIMATION:
            return {...state, playAnimation: action.payload}
        default:
            return state;
    }
}

export default animationReducer;