import {
  CHANGE_EMAIL,
  CHANGE_PROFILE_PICTURE,
  CLEAR_ERROR,
  CODE_SUCCESS,
  COUNTRIES_CODES,
  ERROR,
  GET_PROFILE,
  GET_USER_IN,
  LOGIN,
  LOGOUT,
  VERIFY_CODE,
} from "./authActions";

const initialState = {
  countriesCodes: [],
  token: "",
  user: {},
  codeVerified: false,
  showError: false,
  error: "",
  errorMessage: "",
  isLoggedIn: false,
  profile: {},
  stripeSubscriptions: [],
  payments: [],
  verificationSuccess: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
        user: action.user,
        isLoggedIn: true,
      };
    case GET_USER_IN:
      return {
        ...state,
        token: action.token,
        user: action.user,
        isLoggedIn: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.profile,
        stripeSubscriptions: action.stripeSubscription,
        payments: action.payments,
      };
    case COUNTRIES_CODES:
      return {
        ...state,
        countriesCodes: action.countriesCodes,
      };
    case CHANGE_PROFILE_PICTURE:
      const newUser = { ...state.user };
      newUser.profilePicture = action.profilePicture;
      return {
        ...state,
        user: newUser,
      };
    case CHANGE_EMAIL:
      const newEmailUser = { ...state.user };
      newEmailUser.email = action.email;
      return {
        ...state,
        user: newEmailUser,
      };
    case VERIFY_CODE:
      return {
        ...state,
        codeVerified: true,
      };
    case CODE_SUCCESS:
      return {
        ...state,
        verificationSuccess: true,
      };
    case ERROR:
      return {
        ...state,
        showError: true,
        error: action.error,
        errorMessage: action.errorMessage,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        showError: false,
        error: "",
        errorMessage: "",
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
