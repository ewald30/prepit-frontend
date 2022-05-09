export const headers = {
    'Content--Type': 'application/json'
}

export const getAuthHeader = (token) => {
    return {
        'Content--Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

const BASE_URL = process.env.REACT_APP_API_ENV=== 'development' ? 'http://localhost:8080/PrepIt' : 'https://prepit-backend-deploy.herokuapp.com/PrepIt';

// Auth
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;

// Meal Plan
export const GENERATE_PLAN_URL = `${BASE_URL}/meal/generate`;

// User
export const USER_INFO_URL = `${BASE_URL}/user/info`;
