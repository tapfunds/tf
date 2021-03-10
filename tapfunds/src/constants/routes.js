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

let AUTH_API_ROUTE;
let PLAID_API_ROUTE;
let OBJECT_API_ROUTE;

// Change one url to the production AP
process.env.NODE_ENV === 'development'
  ? AUTH_API_ROUTE = `${process.env.REACT_APP_DEV_AUTH_API_URL}/api/v1`
  : AUTH_API_ROUTE = `${process.env.REACT_APP_PROD_AUTH_API_URL}/api/v1`
  

  process.env.NODE_ENV === 'development'
  ? PLAID_API_ROUTE = `${process.env.REACT_APP_DEV_AUTH_API_URL}/api/v1`
  : PLAID_API_ROUTE = `${process.env.REACT_APP_PROD_AUTH_API_URL}/api/v1`

  process.env.NODE_ENV === 'development'
  ? OBJECT_API_ROUTE = `${process.env.REACT_APP_DEV_AUTH_API_URL}`
  : OBJECT_API_ROUTE = `${process.env.REACT_APP_PROD_AUTH_API_URL}`


export const AUTH_URL = AUTH_API_ROUTE
export const PLAID_URL= PLAID_API_ROUTE
export const OBJECT_URL = OBJECT_API_ROUTE