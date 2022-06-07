import axios from "axios";
import { GET_SAVED_MEALS_URL, GET_COLLECTIONS_FOR_USER, getAuthHeader, SAVE_MEAL_TO_COLLECTION_URL, CREATE_NEW_COLLECTION_URL} from "../../resources/api";
import { withLogs } from "../../resources/logging";

export const getSavedMeals = (collectionId) => {
    return withLogs(
        axios.get(
            GET_SAVED_MEALS_URL(collectionId), 
            {headers: getAuthHeader()}), 
            'GET_SAVED_MEALS'
    );
}



export const saveMealToCollection = (collectionId, collectionName, collectionDescription, meal) => {
    const body = {collectionId, collectionName, collectionDescription, meal: meal}
    return withLogs(
        axios.post(SAVE_MEAL_TO_COLLECTION_URL, 
            body, 
            {headers: getAuthHeader()}), 
            "SAVE MEAL TO COLLECTION"
    )
}

export const createCollection = (name, description) => {
    return withLogs(
        axios.post(CREATE_NEW_COLLECTION_URL,
            {name, description},
            {headers: getAuthHeader()}),
            "CREATE NEW COLLECTION"
    )
}


export async function getCollections(userId){
    return await withLogs(axios.get(
                                GET_COLLECTIONS_FOR_USER(userId), 
                                {headers: getAuthHeader()}), 
                                'GET_COLLECTIONS_FOR_USER');
}

