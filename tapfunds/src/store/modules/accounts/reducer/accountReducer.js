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
    const { payload, type } = action;
    switch (type) {
      case BEFORE_STATE_ACCOUNT:
        return {
          ...state,
          accountsError: null,
          isLoading: true,
        };
      case FETCH_ACCOUNTS:
        return {
          ...state,
          accounts: payload,
          isLoading: false,
        };
  
      case FETCH_ACCOUNTS_ERROR:
        return {
          ...state,
          accountsError: payload,
          isLoading: false,
        };
  
      case FETCH_AUTH_ACCOUNTS:
        return {
          ...state,
          authIntegrations: payload,
          isLoading: false,
        };
  
      case FETCH_AUTH_ACCOUNTS_ERROR:
        return {
          ...state,
          accountsError: payload,
          isLoading: false,
        };
  
      case GET_ACCOUNT_SUCCESS:
        return {
          ...state,
          account: payload,
          accountsError: null,
          isLoading: false,
        };
  
      case GET_ACCOUNT_ERROR:
        return {
          ...state,
          accountsError: payload,
          isLoading: false,
        };
  
      case CREATE_ACCOUNT_SUCCESS:
        return {
          ...state,
          accounts: [payload, ...state.accounts],
          authIntegrations: [payload, ...state.authIntegrations],
          accountsError: null,
          isLoading: false,
        };
  
      case CREATE_ACCOUNT_ERROR:
        return {
          ...state,
          accountsError: payload,
          isLoading: false,
        };
  
      case UPDATE_ACCOUNT_SUCCESS:
        return {
          ...state,
          accounts: state.accounts.map((account) =>
            account.id === payload.id
              ? { ...account, title: payload.title, content: payload.content }
              : account
          ),
          authIntegrations: state.authIntegrations.map((account) =>
            account.id === payload.id
              ? { ...account, title: payload.title, content: payload.content }
              : account
          ),
          account: payload,
          accountsError: null,
          isLoading: false,
        };
  
      case UPDATE_ACCOUNT_ERROR:
        return {
          ...state,
          accountsError: payload,
          isLoading: false,
        };
  
      case DELETE_ACCOUNT_SUCCESS:
        return {
          ...state,
          accounts: state.accounts.filter((account) => account.id !== payload.deletedID),
          authIntegrations: state.authIntegrations.filter(
            (account) => account.id !== payload.deletedID
          ),
          accountsError: null,
          isLoading: false,
        };
  
      case DELETE_ACCOUNT_ERROR:
        return {
          ...state,
          accountsError: payload,
          isLoading: false,
        };
  
      default:
        return state;
    }

  };