import { ADD_SALES, GET_SALES } from "./salesActions";

const initialState = {
  sales: [],
};

export const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SALES:
      return {
        ...state,
        sales: action.sales,
      };
    case GET_SALES:
      return {
        ...state,
        sales: action.sales,
      };
    default:
      return state;
  }
};
