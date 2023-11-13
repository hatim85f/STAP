import {
  ADD_PHASING,
  ADD_TARGET,
  GET_PHASING,
  GET_TARGETS,
} from "./targetActions";

const initialState = {
  target: [],
  phasing: [],
  teamTarget: [],
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
    default:
      return state;
  }
};
