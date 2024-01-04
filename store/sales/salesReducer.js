import {
  ADD_SALES,
  FULL_TEAM_ACHIEVEMENT,
  GET_SALES,
  GET_SALES_VERSIONS,
} from "./salesActions";

const initialState = {
  sales: [],
  salesVersions: [],
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
    case GET_SALES_VERSIONS:
      return {
        ...state,
        salesVersions: action.salesVersions,
      };
    case FULL_TEAM_ACHIEVEMENT:
      return {
        ...state,
        fullTeamAch: action.fullTeamAch,
      };
    default:
      return state;
  }
};
