export const HOST = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000';



////////////////////////////////////////////////// ALL API ROUTES FOR CLIENT //////////////////////////////////////////////////////////////////
export const AUTH_ROUTES = 'api/auth';
export const SIGNUP_ROUTES = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTES = `${AUTH_ROUTES}/login`
export const LOGOUT_ROUTES = `${AUTH_ROUTES}/logout`
export const  GET_USER_ROUTES = `${AUTH_ROUTES}/get-user`


////////////////////////////////////////////////// ALL API ROUTES FOR STORE //////////////////////////////////////////////////////////////////
export const BASE_URL = 'https://dummyjson.com';


/////////////////////////////////////////////////////// GET USER FROM LOCAL STORAGE /////////////////////////////////////////////////
export const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null; // Return default object if no user data found
  };
/////////////////////////////////////////////////////// GET CARTs FROM LOCAL STORAGE /////////////////////////////////////////////////
export const getCartsFromLocalStorage = () => {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : []; // Return default object if no user data found
  };
