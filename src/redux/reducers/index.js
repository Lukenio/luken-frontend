import { APP_LOAD } from '../constants';

const initialState = {
  loading: false,
};

function appReducer(state = initialState, action) {
  switch(action.type) {
    case APP_LOAD:
      return {
        loading: true
      };
    default:
      return state;
  }
}

export default appReducer;
