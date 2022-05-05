import { combineReducers } from "redux";
import authReducer from "./auth";
import animationReducer from "./animation";

const reducers = combineReducers({
    auth: authReducer,
    animation: animationReducer
})

export default reducers; 
