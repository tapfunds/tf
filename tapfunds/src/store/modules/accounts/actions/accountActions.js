import {OBJECT_URL} from "../../../../constants/routes";
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

  export const fetchUserIntegrations = (id) => {
    return async (dispatch) => {
      dispatch({ type: BEFORE_STATE_ACCOUNT });
  
      try {
        const res = await axios.get(`${OBJECT_URL}/user_integrations/${id}`);
        dispatch({ type: FETCH_AUTH_ACCOUNTS, payload: res.data.response });
      } catch (err) {
  
        dispatch({
          type: FETCH_AUTH_ACCOUNTS_ERROR,
          payload: err.response,
        });
      }
    };
  };
  
  export const createIntegration = (createIntegration) => {
    return  (dispatch) => {
      dispatch({ type: BEFORE_STATE_ACCOUNT });
  
      try {
        const res =  axios.post(`${OBJECT_URL}/new_integration`, createIntegration);
        dispatch({
          type: CREATE_ACCOUNT_SUCCESS,
          payload: res.data.response,
        });
        history.push("/home");
      } catch (err) {
        dispatch({ type: CREATE_ACCOUNT_ERROR, payload: err.response });
      }
    };
  };
  
  export const updateIntegration = (updateDetails, updateSuccess) => {
    return async (dispatch) => {
      dispatch({ type: BEFORE_STATE_ACCOUNT });
  
      try {
        const res = await axios.put(
          `${OBJECT_URL}/integrations/${updateDetails.id}`,
          updateDetails
        );
        dispatch({
          type: UPDATE_ACCOUNT_SUCCESS,
          payload: res.data.response,
        });
        updateSuccess();
      } catch (err) {
        dispatch({ type: UPDATE_ACCOUNT_ERROR, payload: err.response });
      }
    };
  };
  
  export const deleteIntegration = (id) => {
    return async (dispatch) => {
      dispatch({ type: BEFORE_STATE_ACCOUNT });
  
      try {
        const res = await axios.delete(`${OBJECT_URL}/integrations/${id}`);
        dispatch({
          type: DELETE_ACCOUNT_SUCCESS,
          payload: {
            deletedID: id,
            message: res.data.response,
          },
        });
        history.push("/home");
      } catch (err) {
        dispatch({ type: DELETE_ACCOUNT_ERROR, payload: err.response.data.error });
      }
    };
  };
  