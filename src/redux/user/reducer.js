import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../constants';

const initialState = {
  isRequesting: false,
  token: null,
  error: null,
};

function userReducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN_REQUEST:
      return {
        isRequesting: true,
        token: null,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        isRequesting: false,
        token: action.token,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        isRequesting: false,
        token: null,
        error: action.response.error,
      };
    default:
      return;
  }
}

export default userReducer;

