import axios from "axios";
import { withLogs } from "../../../resources/logging";
import { USER_INFO_URL, getAuthHeader } from "../../../resources/api";

const getUserInfo = (token) => {
    const authHeaders = getAuthHeader(token);
    return withLogs(
        axios.get(USER_INFO_URL,{headers: authHeaders}))
}


export default getUserInfo;
