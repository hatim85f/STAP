import { GET_PROFIT, GET_USER_PERFORMANCE } from "./profitActions";

const initialState = {
  profit: [],
  userPerformance: [],
};

export const profitReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFIT:
      return {
        ...state,
        profit: action.profit,
      };
    case GET_USER_PERFORMANCE:
      return {
        ...state,
        userPerformance: action.userPerformance,
      };
    default:
      return state;
  }
};
