import {
BEFORE_STATE_ACCOUNT,
FETCH_ACCOUNTS,
FETCH_ACCOUNTS_ERROR,
GET_ACCOUNT_SUCCESS,
GET_ACCOUNT_ERROR,
CREATE_ACCOUNT_SUCCESS,
CREATE_ACCOUNT_ERROR,
UPDATE_ACCOUNT_SUCCESS,
UPDATE_ACCOUNT_ERROR,
DELETE_ACCOUNT_SUCCESS,
DELETE_ACCOUNT_ERROR,
FETCH_AUTH_ACCOUNTS,
FETCH_AUTH_ACCOUNTS_ERROR,
} from "../accountTypes/index";

export const initState = {
    accounts: [],
    authAccounts: [],
    account: {},
    accountsError: null,
    isLoading: false,
  };

export const accountReducer = (state = initState, action) => {
    return (<div>Nothing</div>);

  };