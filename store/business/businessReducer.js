// array of businesses each business contains all busness details

import { ADD_BUSINESS, GET_USER_BUSINESSES } from "./businessActions";

const initialState = {
  business: [],
};

export const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BUSINESSES:
      return {
        ...state,
        business: action.payload,
      };
    case ADD_BUSINESS:
      return {
        ...state,
        business: state.business.concat(action.payload),
      };
    default:
      return state;
  }
};
