export const headers = {
    'Content--Type': 'application/json'
}

export const getAuthHeader = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const token = localStorage.getItem('token');

    return {
        'Content--Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Refresh-Token': `Bearer ${refreshToken}`
    }
}

const BASE_URL = process.env.REACT_APP_API_ENV=== 'development' ? 'http://localhost:8080/PrepIt' : 'https://prepit-backend-deploy.herokuapp.com/PrepIt';

// Auth
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const REFRESH_TOKEN_URL = `${BASE_URL}/auth/token/refresh`;



// Meals
export const GENERATE_PLAN_URL = `${BASE_URL}/meal/generate`;




// User
export const USER_INFO_URL = `${BASE_URL}/user/info`;
export const USER_UPDATE = `${BASE_URL}/user/update`;
export const USER_UPDATE_MEASUREMENTS = `${BASE_URL}/user/update-measurements`;




// Collection
export const CREATE_NEW_COLLECTION_URL = `${BASE_URL}/collection/insert`;

export const GET_SAVED_MEALS_URL = (collectionId) =>{
    return `${BASE_URL}/collection/find-by-id?id=${collectionId}`;
}

export const GET_COLLECTIONS_FOR_USER = (userId) => {
    return `${BASE_URL}/collection/find-by-user?id=${userId}`;
}

export const SAVE_MEAL_TO_COLLECTION_URL = `${BASE_URL}/collection/save-meal`





// Dev tools
export const GET_ALGORITHM_DATA_FOR_PLOT = (iterations, calories) => {
    return `${BASE_URL}/meal/test/plot?iterations=${iterations}&calories=${calories}`
}