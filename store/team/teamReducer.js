import { GET_USER_BUSINESSES } from "../business/businessActions";
import {
  INVITE_MEMBER,
  EDIT_MEMBER,
  DELETE_MEMBER,
  FULL_TEAM_ACHIEVEMENT,
  GET_MEMBER_SALES,
} from "./teamActions";

const initialState = {
  team: [],
  fullTeamAch: [],
  memberSales: [],
};

export const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVITE_MEMBER:
      return {
        ...state,
        team: state.team.concat(action.member),
      };
    case EDIT_MEMBER:
      return {
        ...state,
        team: state.team.map((item) =>
          item._id === action.member._id ? action.member : item
        ),
      };
    case GET_USER_BUSINESSES:
      return {
        ...state,
        team: action.team,
      };
    case GET_MEMBER_SALES:
      return {
        ...state,
        memberSales: action.memberSales,
      };
    case DELETE_MEMBER:
      return {
        ...state,
        team: state.team.filter((item) => item._id !== action.memberId),
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
