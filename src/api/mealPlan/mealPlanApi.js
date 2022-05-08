import axios from "axios";
import { GENERATE_PLAN_URL, getAuthHeader, headers } from "../../resources/api";
import { withLogs } from "../../resources/logging";

const generateMealPlan = (userInfo, token) => {
    const authHeaders = getAuthHeader(token);
    return withLogs(
        axios.post(
            GENERATE_PLAN_URL,
            userInfo,
            {headers: authHeaders}
        ), 'GENERATE_MEAL_PLAN'
    );
}


export default generateMealPlan;