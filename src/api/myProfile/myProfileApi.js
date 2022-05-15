import axios from "axios";
import { getAuthHeader, GET_COLLECTIONS_FOR_USER } from "../../resources/api";
import { withLogs } from "../../resources/logging";

const getCollections = (token, userId) =>{
    const authHeaders = getAuthHeader(token);
    return withLogs(
        axios.get(
            GET_COLLECTIONS_FOR_USER(userId), 
            {headers: authHeaders}), 
            'GET_COLLECTIONS_FOR_USER'
    );
}

export default getCollections;