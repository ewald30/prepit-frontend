export const headers = {
    'Content--Type': 'application/json'
}


const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/PrepIt' : 'https://prod_url';

// Auth
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
