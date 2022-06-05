import axios from "axios";
import { USER_UPDATE, getAuthHeader, headers } from "../../resources/api";
import { withLogs } from "../../resources/logging";

export const updateUser = (userInfo, token) => {
    const authHeaders = getAuthHeader(token);
    return withLogs(
        axios.put(
            USER_UPDATE,
            userInfo, 
            {headers: authHeaders}), 
            'UPDATE USER'
    );
}