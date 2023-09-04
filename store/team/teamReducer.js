import { GET_TEAM, INVITE_MEMBER } from "./teamActions";

const initialState = {
  team: [],
};

export const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVITE_MEMBER:
      return {
        ...state,
        team: state.team.concat(action.member),
      };
    case GET_TEAM:
      return {
        ...state,
        team: action.team,
      };
    default:
      return state;
  }
};
