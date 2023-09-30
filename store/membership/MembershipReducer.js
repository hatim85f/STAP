import { GET_PACKAGES } from "./MembershipActions";

const intialState = {
  packages: [],
  activePackageId: null,
};

export const membershipReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_PACKAGES:
      return {
        ...state,
        packages: action.packages,
      };
    default:
      return state;
  }
};
