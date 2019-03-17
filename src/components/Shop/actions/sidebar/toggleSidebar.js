import { TOGGLE_SIDEBAR } from '../actionTypes';

export default (open) => (dispatch) => () => {
  dispatch({
    type: TOGGLE_SIDEBAR,
    payload: open
  });
};