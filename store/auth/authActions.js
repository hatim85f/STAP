import AsyncStorage from "@react-native-async-storage/async-storage";
import { mainLink } from "../mainLink";
import { SYSTEM_MESSAGE } from "../messages/messagesActions";
import { Platform } from "react-native";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const COUNTRIES_CODES = "COUNTRIES_CODES";
export const REGISTER_USER = "REGISTER_USER";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const ERROR = "ERROR";
export const VERIFY_CODE = "VERIFY_CODE";
export const GET_USER_IN = "GET_USER_IN";

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const resData = await response.json();

    const userData = {
      user: resData.user,
      token: resData.token,
    };

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        errorMessage: resData.message,
      });
    }

    await AsyncStorage.setItem("userDetails", JSON.stringify(userData));

    if (Platform.OS === "web") {
      window.localStorage.setItem("userDetails", JSON.stringify(userData));
    }

    dispatch({
      type: LOGIN,
      token: resData.token,
      user: resData.user,
    });
  };
};

// REGISTERING NEW USER
// WILL TAKE THE SAME TYPE OF LOGIN
// RESDATA RETURNING USER, TOKEN, WILL BE SAVED IN USERDETAILS
export const registerUser = (
  userName,
  email,
  userType,
  firstName,
  lastName,
  phone,
  password,
  designation
) => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
        userType,
        firstName,
        lastName,
        phone,
        password,
        designation,
      }),
    });

    const resData = await response.json();

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        errorMessage: resData.message,
      });
    }

    const userData = {
      user: resData.user,
      token: resData.token,
    };

    await AsyncStorage.setItem("userDetails", JSON.stringify(userData));

    dispatch({
      type: LOGIN,
      token: resData.token,
      user: resData.user,
    });
  };
};

// sending to backend user email to get the code and reset user's password
export const sendToReset = (userEmail) => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/api/auth/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail }),
    });

    const resData = await response.json();

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        errorMessage: resData.message,
      });
    }
  };
};

export const verifyCode = (userEmail, resetCode) => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/api/auth/code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail, resetCode }),
    });

    const resData = await response.json();

    if (response.ok) {
      dispatch({
        type: VERIFY_CODE,
      });
    }

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        errorMessage: resData.message,
      });
    }
  };
};

export const changePassword = (newPassword) => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/api/auth/newPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword }),
    });

    const resData = await response.json();

    dispatch({
      type: SYSTEM_MESSAGE,
      systemMessage: resData.message,
    });
  };
};

// loggin user out
export const logOut = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem("userDetails");

    dispatch({
      type: LOGOUT,
    });
  };
};

// getting countries phone codes for all the countries
export const getCountriesCodes = () => {
  return async (dispatch) => {
    const response = await fetch("https://restcountries.com/v3.1/all");

    const resData = await response.json();

    const countryList = [];

    for (let key of resData) {
      countryList.push({
        name: key.name.common,
        code: key.idd.root,
        suffixes: key.idd.suffixes,
        flag: key.flags.png,
      });
    }

    countryList.sort((a, b) => a.name.localeCompare(b.name));

    dispatch({
      type: COUNTRIES_CODES,
      countriesCodes: countryList,
    });
  };
};

export const clearError = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };
};

export const getUserIn = (userDetails) => {
  return async (dispatch) => {
    console.log(userDetails.token, userDetails.user, "userDetails");
    dispatch({
      type: GET_USER_IN,
      token: userDetails.token,
      user: userDetails.user,
    });
  };
};

export const setError = (error, errorMessage) => {
  return async (dispatch) => {
    dispatch({
      type: ERROR,
      error: error,
      errorMessage: errorMessage,
    });
  };
};
