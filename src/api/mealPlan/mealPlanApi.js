import axios from "axios";
import { GENERATE_PLAN_URL, headers } from "../../resources/api";
import { withLogs } from "../../resources/logging";

const generateMealPlan = (userInfo) => {
    return withLogs(
        axios.post(
            GENERATE_PLAN_URL,
            userInfo,
            headers
        ), 'GENERATE_MEAL_PLAN'
    );
}

export default generateMealPlan;