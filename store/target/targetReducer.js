import {
  ADD_PHASING,
  ADD_TARGET,
  BUSINESS_TARGETS,
  GET_INDIVIDUAL_TARGET,
  GET_PHASING,
  GET_TARGETS,
  GET_TEAM_TARGET,
} from "./targetActions";

const initialState = {
  target: [],
  phasing: [],
  teamTarget: [],
  userTarget: [],
  businessTargets: [],
};

export const targetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHASING:
      return {
        ...state,
        phasing: action.phasing,
      };
    case ADD_PHASING:
      return {
        ...state,
        phasing: [...state.phasing, action.phasing],
      };
    case GET_TARGETS:
      return {
        ...state,
        target: action.target,
      };
    case ADD_TARGET:
      return {
        ...state,
        target: [...state.target, action.target],
      };
    case GET_INDIVIDUAL_TARGET:
      return {
        ...state,
        userTarget: action.userTarget,
      };
    case GET_TEAM_TARGET:
      return {
        ...state,
        teamTarget: action.teamTarget,
      };
    case BUSINESS_TARGETS:
      return {
        ...state,
        businessTargets: action.businessTargets,
      };
    default:
      return state;
  }
};
