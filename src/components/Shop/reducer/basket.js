import { ADD_TO_BASKET } from '../actions/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      const newItem = {
        item: action.item,
        quantity: 1
      };

      return state.concat(newItem);
    default:
      return state;
  }
};