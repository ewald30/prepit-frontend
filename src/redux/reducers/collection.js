import { COLLECTION_SET_SELECTED } from "../actions/collection"

const collectionState= {
    selectedCollection: null 
}

const collectionReducer = (state = collectionState, action) => {
    switch (action.type) {
        case COLLECTION_SET_SELECTED:
            return {...state, selectedCollection: action.payload}
        default:
            return state;
    }
}

export default collectionReducer;