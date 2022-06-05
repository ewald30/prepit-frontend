import axios from "axios";
import { GET_ALGORITHM_DATA_FOR_PLOT, getAuthHeader, headers } from "../../resources/api";
import { withLogs } from "../../resources/logging";

export const getDataForAlgorithmChart = (iterations, calories, token) => {
    const authHeaders = getAuthHeader(token);
    return withLogs(
        axios.get(
            GET_ALGORITHM_DATA_FOR_PLOT(iterations, calories), 
            {headers: authHeaders}), 
            'GET_SAVED_MEALS'
    );
}