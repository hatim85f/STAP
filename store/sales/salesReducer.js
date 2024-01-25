import {
  ADD_SALES,
  FULL_TEAM_ACHIEVEMENT,
  GET_MEMBER_ACHIEVEMENT,
  GET_SALES,
  GET_SALES_VERSIONS,
  GET_SINGLE_SALES_VERSIONS,
  INDIVIDUAL_YTD,
  TEAM_YTD,
} from "./salesActions";

const initialState = {
  sales: [],
  salesVersions: [],
  memberSales: [],
  fullTeamAch: [],
  memberAchievement: [],
  teamYTD: [],
  teamTarget: [],
  teamSales: [],
  individualYTD: [],
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
    case GET_SINGLE_SALES_VERSIONS:
      return {
        ...state,
        memberSales: action.memberSales,
      };
    case FULL_TEAM_ACHIEVEMENT:
      return {
        ...state,
        fullTeamAch: action.fullTeamAch,
      };
    case GET_MEMBER_ACHIEVEMENT:
      return {
        ...state,
        memberAchievement: action.memberAchievement,
      };
    case TEAM_YTD:
      return {
        ...state,
        teamYTD: action.teamYTD,
        teamTarget: action.teamTarget,
        teamSales: action.teamSales,
      };
    case INDIVIDUAL_YTD:
      return {
        ...state,
        individualYTD: action.individualYTD,
      };
    default:
      return state;
  }
};
