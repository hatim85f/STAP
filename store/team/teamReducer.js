import { INVITE_MEMBER } from "./teamActions";

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
    default:
      return state;
  }
};
