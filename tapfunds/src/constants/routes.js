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
let VAR_API_ROUTE

process.env.NODE_ENV === 'development'
  ? VAR_API_ROUTE = `${process.env.REACT_APP_DEV_AUTH_API_URL}/api/v1`
  : VAR_API_ROUTE = `${process.env.REACT_APP_DEV_AUTH_API_URL}/api/v1`
  
export default VAR_API_ROUTE