import { ADD_PURCHASE, GET_PURCHASES } from "./purchaseActions";

const initialState = {
  purchases: [],
};

export const purchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PURCHASES:
      return {
        ...state,
        purchases: action.purchases,
      };
    case ADD_PURCHASE:
      return {
        ...state,
        purchases: state.purchases.push(action.order),
      };
    default:
      return state;
  }
};
