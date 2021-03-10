import API_ROUTE from "../../../../constants/routes";
import axios from "axios";
import {
  BEFORE_STATE_INTEGRATION,
  CREATE_INTEGRATION_SUCCESS,
  CREATE_INTEGRATION_ERROR,
  UPDATE_INTEGRATION_SUCCESS,
  UPDATE_INTEGRATION_ERROR,
  DELETE_INTEGRATION_SUCCESS,
  DELETE_INTEGRATION_ERROR,
  FETCH_AUTH_INTEGRATIONS,
  FETCH_AUTH_INTEGRATIONS_ERROR,
} from "../integrationsTypes/index";
import { history } from "../../../../utils/history";

export const fetchUserIntegrations = (id) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_INTEGRATION });

    try {
      const res = await axios.get(`${API_ROUTE}/user_integrations/${id}`);
      dispatch({ type: FETCH_AUTH_INTEGRATIONS, payload: res.data.response });
    } catch (err) {

      dispatch({
        type: FETCH_AUTH_INTEGRATIONS_ERROR,
        payload: err.response,
      });
    }
  };
};

export const createIntegration = (createIntegration) => {
  return  (dispatch) => {
    dispatch({ type: BEFORE_STATE_INTEGRATION });

    try {
      const res =  axios.post(`${API_ROUTE}/new_integration`, createIntegration);
      dispatch({
        type: CREATE_INTEGRATION_SUCCESS,
        payload: res.data.response,
      });
      history.push("/home");
    } catch (err) {
      dispatch({ type: CREATE_INTEGRATION_ERROR, payload: err.response });
    }
  };
};

export const updateIntegration = (updateDetails, updateSuccess) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_INTEGRATION });

    try {
      const res = await axios.put(
        `${API_ROUTE}/integrations/${updateDetails.id}`,
        updateDetails
      );
      dispatch({
        type: UPDATE_INTEGRATION_SUCCESS,
        payload: res.data.response,
      });
      updateSuccess();
    } catch (err) {
      dispatch({ type: UPDATE_INTEGRATION_ERROR, payload: err.response });
    }
  };
};

export const deleteIntegration = (id) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_INTEGRATION });

    try {
      const res = await axios.delete(`${API_ROUTE}/integrations/${id}`);
      dispatch({
        type: DELETE_INTEGRATION_SUCCESS,
        payload: {
          deletedID: id,
          message: res.data.response,
        },
      });
      history.push("/home");
    } catch (err) {
      dispatch({ type: DELETE_INTEGRATION_ERROR, payload: err.response.data.error });
    }
  };
};
