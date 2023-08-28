// array of businesses each business contains all busness details

import { ADD_BUSINESS } from "./businessActions";

const initialState = {
  business: [],
};

export const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUSINESS:
      return {
        ...state,
        business: state.business.concat(action.payload),
      };
    default:
      return state;
  }
};
