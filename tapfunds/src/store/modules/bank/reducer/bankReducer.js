import {
BEFORE_STATE_BANK,
FETCH_BANK,
FETCH_BANK_ERROR,
GET_BANK_SUCCESS,
GET_BANK_ERROR,
CREATE_BANK_SUCCESS,
CREATE_BANK_ERROR,
UPDATE_BANK_SUCCESS,
UPDATE_BANK_ERROR,
DELETE_BANK_SUCCESS,
DELETE_BANK_ERROR,
FETCH_AUTH_BANK,
FETCH_AUTH_BANK_ERROR,
} from "../bankTypes/index";

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
      case BEFORE_STATE_BANK:
        return {
          ...state,
          accountsError: null,
          isLoading: true,
        };
      case FETCH_BANK:
        return {
          ...state,
          accounts: payload,
          isLoading: false,
        };
  
      case FETCH_BANK_ERROR:
        return {
          ...state,
          accountsError: payload,
          isLoading: false,
        };
  
      case FETCH_AUTH_BANK:
        return {
          ...state,
          authIntegrations: payload,
          isLoading: false,
        };
  
      case FETCH_AUTH_BANK_ERROR:
        return {
          ...state,
          accountsError: payload,
          isLoading: false,
        };
  
      case GET_BANK_SUCCESS:
        return {
          ...state,
          account: payload,
          accountsError: null,
          isLoading: false,
        };
  
      case GET_BANK_ERROR:
        return {
          ...state,
          accountsError: payload,
          isLoading: false,
        };
  
      case CREATE_BANK_SUCCESS:
        return {
          ...state,
          accounts: [payload, ...state.accounts],
          authIntegrations: [payload, ...state.authIntegrations],
          accountsError: null,
          isLoading: false,
        };
  
      case CREATE_BANK_ERROR:
        return {
          ...state,
          accountsError: payload,
          isLoading: false,
        };
  
      case UPDATE_BANK_SUCCESS:
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
  
      case UPDATE_BANK_ERROR:
        return {
          ...state,
          accountsError: payload,
          isLoading: false,
        };
  
      case DELETE_BANK_SUCCESS:
        return {
          ...state,
          accounts: state.accounts.filter((account) => account.id !== payload.deletedID),
          authIntegrations: state.authIntegrations.filter(
            (account) => account.id !== payload.deletedID
          ),
          accountsError: null,
          isLoading: false,
        };
  
      case DELETE_BANK_ERROR:
        return {
          ...state,
          accountsError: payload,
          isLoading: false,
        };
  
      default:
        return state;
    }

  };