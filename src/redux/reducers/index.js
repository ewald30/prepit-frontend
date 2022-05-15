import { combineReducers } from "redux";
import authReducer from "./auth";
import animationReducer from "./animation";
import collectionReducer from "./collection";

const reducers = combineReducers({
    auth: authReducer,
    animation: animationReducer,
    collection: collectionReducer
})

export default reducers; 
