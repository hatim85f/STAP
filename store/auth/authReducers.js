import {
  CLEAR_ERROR,
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
      };
    case COUNTRIES_CODES:
      return {
        ...state,
        countriesCodes: action.countriesCodes,
      };
    case VERIFY_CODE:
      return {
        ...state,
        codeVerified: true,
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
