import AUTH_API_ROUTE from "../../../../constants/routes";
import axios from "axios";
import {
    BEFORE_STATE_ACCOUNT,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_ERROR,
    UPDATE_ACCOUNT_SUCCESS,
    UPDATE_ACCOUNT_ERROR,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_ERROR,
    FETCH_AUTH_ACCOUNTS,
    FETCH_AUTH_ACCOUNTS_ERROR,
  } from "../accountsTypes/index";
  import { history } from "../../../../utils/history";

