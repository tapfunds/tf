import {
  BEFORE_STATE_INTEGRATION,
  FETCH_INTEGRATIONS,
  FETCH_INTEGRATIONS_ERROR,
  GET_INTEGRATION_SUCCESS,
  GET_INTEGRATION_ERROR,
  CREATE_INTEGRATION_SUCCESS,
  CREATE_INTEGRATION_ERROR,
  UPDATE_INTEGRATION_SUCCESS,
  UPDATE_INTEGRATION_ERROR,
  DELETE_INTEGRATION_SUCCESS,
  DELETE_INTEGRATION_ERROR,
  FETCH_AUTH_INTEGRATIONS,
  FETCH_AUTH_INTEGRATIONS_ERROR,
} from "../integrationsTypes/index";

export const initState = {
  integrations: [],
  authIntegrations: [],
  integration: {},
  integrationsError: null,
  isLoading: false,
};

export const integrationsReducer = (state = initState, action) => {
  const { payload, type } = action;
  switch (type) {
    case BEFORE_STATE_INTEGRATION:
      return {
        ...state,
        integrationsError: null,
        isLoading: true,
      };
    case FETCH_INTEGRATIONS:
      return {
        ...state,
        integrations: payload,
        isLoading: false,
      };

    case FETCH_INTEGRATIONS_ERROR:
      return {
        ...state,
        integrationsError: payload,
        isLoading: false,
      };

    case FETCH_AUTH_INTEGRATIONS:
      return {
        ...state,
        authIntegrations: payload,
        isLoading: false,
      };

    case FETCH_AUTH_INTEGRATIONS_ERROR:
      return {
        ...state,
        integrationsError: payload,
        isLoading: false,
      };

    case GET_INTEGRATION_SUCCESS:
      return {
        ...state,
        integration: payload,
        integrationsError: null,
        isLoading: false,
      };

    case GET_INTEGRATION_ERROR:
      return {
        ...state,
        integrationsError: payload,
        isLoading: false,
      };

    case CREATE_INTEGRATION_SUCCESS:
      return {
        ...state,
        integrations: [payload, ...state.integrations],
        authIntegrations: [payload, ...state.authIntegrations],
        integrationsError: null,
        isLoading: false,
      };

    case CREATE_INTEGRATION_ERROR:
      return {
        ...state,
        integrationsError: payload,
        isLoading: false,
      };

    case UPDATE_INTEGRATION_SUCCESS:
      return {
        ...state,
        integrations: state.integrations.map((integration) =>
          integration.id === payload.id
            ? { ...integration, title: payload.title, content: payload.content }
            : integration
        ),
        authIntegrations: state.authIntegrations.map((integration) =>
          integration.id === payload.id
            ? { ...integration, title: payload.title, content: payload.content }
            : integration
        ),
        integration: payload,
        integrationsError: null,
        isLoading: false,
      };

    case UPDATE_INTEGRATION_ERROR:
      return {
        ...state,
        integrationsError: payload,
        isLoading: false,
      };

    case DELETE_INTEGRATION_SUCCESS:
      return {
        ...state,
        integrations: state.integrations.filter((integration) => integration.id !== payload.deletedID),
        authIntegrations: state.authIntegrations.filter(
          (integration) => integration.id !== payload.deletedID
        ),
        integrationsError: null,
        isLoading: false,
      };

    case DELETE_INTEGRATION_ERROR:
      return {
        ...state,
        integrationsError: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};
