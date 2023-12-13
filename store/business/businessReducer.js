// array of businesses each business contains all busness details

import {
  ADD_BUSINESS,
  DELETE_BUSINESS,
  EDIT_BUSINESS,
  GET_EMPLOYEE_BUSINESSES,
  GET_USER_BUSINESSES,
} from "./businessActions";

const initialState = {
  business: [],
  userBusiness: {},
};

export const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BUSINESSES:
      return {
        ...state,
        business: action.payload,
      };
    case ADD_BUSINESS:
      return {
        ...state,
        business: state.business.concat(action.payload),
      };
    case EDIT_BUSINESS:
      const businessIndex = state.business.findIndex(
        (x) => x.business._id === action.payload.businessId
      );

      const updatedBusiness = [...state.business];
      updatedBusiness[businessIndex].business = action.payload;

      return {
        ...state,
        business: updatedBusiness,
      };
    case DELETE_BUSINESS:
      return {
        ...state,
        business: state.business.filter(
          (x) => x.business._id !== action.payload
        ),
      };
    case GET_EMPLOYEE_BUSINESSES:
      return {
        ...state,
        userBusiness: action.payload,
      };
    default:
      return state;
  }
};
