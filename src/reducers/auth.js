import {
  AUTH_LOGIN_USER_REQUEST,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_LOGIN_USER_FAILURE,
  AUTH_REGISTER_USER_REQUEST,
  AUTH_REGISTER_USER_FAILURE,
  AUTH_REGISTER_USER_SUCCESS,
  AUTH_LOGOUT_USER,
  AUTH_INVALIDATE_TOKEN,
  AUTH_CLEAN_STATUS_TEXT
} from '../constants';

const initialState = {
  token: null,
  isAuthenticated: false,
  isAuthenticating: false,
  isRegistrering: false,
  isRegistred: false,
  statusText: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_USER_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
        statusText: null
      };

    case AUTH_LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.payload.token,
        statusText: 'You have been successfully logged in.'
      };

    case AUTH_LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        statusText: `Authentication Error: ${action.payload.statusText}`
      };

    case AUTH_LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        statusText: 'You have been successfully logged out.'
      };

    case AUTH_REGISTER_USER_REQUEST:
      return {
        ...state,
        isRegistrering: true,
        statusText: null
      };

    case AUTH_REGISTER_USER_SUCCESS:
      return {
        ...state,
        isRegistrering: false,
        isRegistred: true
      };

    case AUTH_REGISTER_USER_FAILURE:
      return {
        ...state,
        isRegistrering: false,
        isRegistred: false,
        statusText: `Registration error: ${action.payload.statusText}`
      };
    case AUTH_INVALIDATE_TOKEN:
      return {
        ...state,
        isAuthenticated: false,
        token: null
      };

    case AUTH_CLEAN_STATUS_TEXT:
      return {
        ...state,
        statusText: null
      };

    default:
      return state;
  }
}
