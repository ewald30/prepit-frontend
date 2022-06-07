import axios from "axios";
import { USER_UPDATE, USER_INFO_URL, getAuthHeader } from "../../resources/api";
import { withLogs } from "../../resources/logging";
import { handleRefreshToken } from "../auth/auth";

export const updateUser = (userInfo, token) => {
    const authHeaders = getAuthHeader();
    return withLogs(
        axios.put(
            USER_UPDATE,
            userInfo, 
            {headers: authHeaders}), 
            'UPDATE USER'
    );
}

export async function getUserInfo(){
    return withLogs(axios.get(USER_INFO_URL,{headers: getAuthHeader()}))
}
