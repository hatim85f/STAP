import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const GET_CURRENCY_LIST = "GET_CURRENCY_LIST";
export const EDIT_CURRENCY = "EDIT_CURRENCY";
export const EDIT_PASSWORD = "EDIT_PASSWORD";
export const DEACTIVATE_ACCOUNT = "DEACTIVATE_ACCOUNT";

export const getCurrencyList = () => {
  return async (dispatch) => {
    const response = await fetch("https://restcountries.com/v3.1/all");

    const resData = await response.json();

    const currencyList = [];

    const extractCurrencyInfo = (data) => {
      for (let dataObj of data) {
        // Check if the country has currency information
        if (dataObj.currencies) {
          for (let currencyCode in dataObj.currencies) {
            if (dataObj.currencies.hasOwnProperty(currencyCode)) {
              const countryName = dataObj.name.common;
              const currencyData = dataObj.currencies[currencyCode];
              const currencyName = currencyData.name;
              const currencySymbol = currencyData.symbol;
              const countryFlag = dataObj.flags.png;

              // Create an object with the extracted information
              const currencyInfo = {
                countryName,
                currencyCode,
                currencyName,
                currencySymbol,
                countryFlag,
              };

              // Add the currencyInfo object to the currencyList
              currencyList.push(currencyInfo);
            }
          }
        }
      }
    };

    extractCurrencyInfo(resData);

    // dataObj.name.common
    // dataObj.flags.png

    dispatch({
      type: GET_CURRENCY_LIST,
      currencyList: currencyList,
    });
  };
};

export const updateCurency = (currencyDetails) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/settings/currency`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        currencyDetails,
        userId: user._id,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    const { currencyCode, currencySymbol, countryFlag, currencyName } =
      currencyDetails;

    dispatch({
      type: EDIT_CURRENCY,
      currencyCode,
      currencySymbol,
      countryFlag,
      currencyName,
    });
  };
};

export const updatePassword = (oldPassword, newPassword) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(`${mainLink}/api/settings/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
        userId: user._id,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};

export const deactivateAccount = (status) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(`${mainLink}/api/settings/deactivate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        status,
        userId: user._id,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};
