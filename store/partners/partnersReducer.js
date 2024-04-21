import { ADD_PARTNER, DELETE_PARTNER, GET_PARTNERS } from "./partnersActions";

const initialState = {
  partners: [],
};

export const partnersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PARTNERS:
      return {
        ...state,
        partners: action.partners,
      };
    case ADD_PARTNER:
      return {
        ...state,
        partners: state.partners.concat(action.partnerData),
      };
    case DELETE_PARTNER:
      return {
        ...state,
        partners: state.partners.filter(
          (partner) => partner._id !== action.partnerId
        ),
      };
    default:
      return state;
  }
};
