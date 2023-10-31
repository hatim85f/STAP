import { ADD_MEMBERSHIP, GET_PACKAGES } from "./MembershipActions";

const intialState = {
  packages: [],
  activePackageId: null,
  membership: null,
};

export const membershipReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_PACKAGES:
      return {
        ...state,
        packages: action.packages,
      };
    case ADD_MEMBERSHIP:
      return {
        ...state,
        membership: action.membership,
      };
    default:
      return state;
  }
};
