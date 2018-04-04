import { SET_GLOBAL_FORM_VALUES } from '../constants';

export function setGlobalFormValues({ TA, LA }) {
  return {
    type: SET_GLOBAL_FORM_VALUES,
    payload: {
      TA,
      LA
    }
  };
}
