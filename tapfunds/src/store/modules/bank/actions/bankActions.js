import {OBJECT_URL} from "../../../../constants/routes";
import axios from "axios";
import {
    BEFORE_STATE_BANK,
    CREATE_BANK_SUCCESS,
    CREATE_BANK_ERROR,
    UPDATE_BANK_SUCCESS,
    UPDATE_BANK_ERROR,
    DELETE_BANK_SUCCESS,
    DELETE_BANK_ERROR,
    FETCH_AUTH_BANK,
    FETCH_AUTH_BANK_ERROR,
  } from "../bankTypes/index";

import { history } from "../../../../utils/history";

  export const fetchUserAccounts = (id) => {
    return async (dispatch) => {
      dispatch({ type: BEFORE_STATE_BANK });
  
      try {
        const res = await axios.get(`${OBJECT_URL}/get/${id}`);
        dispatch({ type: FETCH_AUTH_BANK, payload: res.data.response });
      } catch (err) {
  
        dispatch({
          type: FETCH_AUTH_BANK_ERROR,
          payload: err.response,
        });
      }
    };
  };
  
  export const createAccountObject = (createAccount) => {
    return async (dispatch) => {
      dispatch({ type: BEFORE_STATE_BANK });
  
      try {
        const res = await axios.post(OBJECT_URL, createAccount)
        dispatch({
          type: CREATE_BANK_SUCCESS,
          payload: res.data.response,
        });
        history.push("/home");
      } catch (err) {
        dispatch({ type: CREATE_BANK_ERROR, payload: err.response });
      }
    };
  };
  
  export const updateAccountObject = (updateDetails, updateSuccess) => {
    return async (dispatch) => {
      dispatch({ type: BEFORE_STATE_BANK });
  
      try {
        const res = await axios.put(
          `${OBJECT_URL}/update/${updateDetails.id}`,
          updateDetails
        );
        dispatch({
          type: UPDATE_BANK_SUCCESS,
          payload: res.data.response,
        });
        updateSuccess();
      } catch (err) {
        dispatch({ type: UPDATE_BANK_ERROR, payload: err.response });
      }
    };
  };
  
  export const deleteAccountObject = (id) => {
    return async (dispatch) => {
      dispatch({ type: BEFORE_STATE_BANK });
  
      try {
        const res = await axios.delete(`${OBJECT_URL}/delete/${id}`);
        dispatch({
          type: DELETE_BANK_SUCCESS,
          payload: {
            deletedID: id,
            message: res.data.response,
          },
        });
        history.push("/home");
      } catch (err) {
        dispatch({ type: DELETE_BANK_ERROR, payload: err.response.data.error });
      }
    };
  };
  