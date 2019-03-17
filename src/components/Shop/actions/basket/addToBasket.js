import { ADD_TO_BASKET } from '../actionTypes';

export default (item) => (dispatch) => () => {
  dispatch({
    type: ADD_TO_BASKET,
    item
  });
};