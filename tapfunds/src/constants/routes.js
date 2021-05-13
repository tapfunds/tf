export const LANDING = '/';
export const SIGN_UP = '/signup';
export const SIGN_IN = '/login';
export const HOME = '/home';
export const AUTH = '/auth';
export const PROFILE = '/profile';
export const RESET = '/reset';
export const SETTING = '/settings';
export const STATS = '/data';
export const FOF = '';
export const ACCOUNTS = '/accounts';
export const WALLETS = '/wallets';
export const TRANSFERS = '/transfers';
export const ABOUT = '/about';

console.log(process.env.NODE_ENV)

export const AUTH_URL = `${process.env.REACT_APP_AUTH_API_URL}/api/v1`
export const PLAID_URL= `${process.env.REACT_APP_PLAID_API_URL}/api/v1`
export const OBJECT_URL = `${process.env.REACT_APP_OBJECT_API_URL}/`
