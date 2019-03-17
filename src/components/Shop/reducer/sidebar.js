import { TOGGLE_SIDEBAR } from '../actions/actionTypes';

const initialState = {
  isOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isOpen: action.payload
      };
    default:
      return state;
  }
};