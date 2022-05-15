import axios from "axios";
import { GET_SAVED_MEALS_URL, getAuthHeader, SAVE_MEAL_TO_COLLECTION_URL, CREATE_NEW_COLLECTION_URL} from "../../resources/api";
import { withLogs } from "../../resources/logging";

export const getSavedMeals = (token, collectionId) => {
    const authHeaders = getAuthHeader(token);
    return withLogs(
        axios.get(
            GET_SAVED_MEALS_URL(collectionId), 
            {headers: authHeaders}), 
            'GET_SAVED_MEALS'
    );
}

export const saveMealToCollection = (token, collectionId, collectionName, collectionDescription, meal) => {
    const authHeaders = getAuthHeader(token);
    const body = {collectionId, collectionName, collectionDescription, meal: meal}
    return withLogs(
        axios.post(SAVE_MEAL_TO_COLLECTION_URL, 
            body, 
            {headers: authHeaders}), 
            "SAVE MEAL TO COLLECTION"
    )
}

export const createCollection = (name, description) => {
    const token =  localStorage.getItem('token');
    const authHeaders = getAuthHeader(token);
    return withLogs(
        axios.post(CREATE_NEW_COLLECTION_URL,
            {name, description},
            {headers: authHeaders}),
            "CREATE NEW COLLECTION"
    )
}
