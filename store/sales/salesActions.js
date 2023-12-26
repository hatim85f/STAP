import moment from "moment";
import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const ADD_SALES = "ADD_SALES";
export const GET_SALES = "GET_SALES";

export const addSales = (salesData, version, startPeriod, endPeriod) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/sales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        salesData,
        version,
        userId: user._id,
        startPeriod,
        endPeriod,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ADD_SALES,
      salesData,
      version,
    });

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};

export const getSales = (startPeriod, endPeriod) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    window.localStorage.setItem("startDate", startPeriod);
    window.localStorage.setItem("endDate", endPeriod);

    const response = await fetch(
      `${mainLink}/api/sales/${user._id}?startPeriod=${startPeriod}&endPeriod=${endPeriod}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: "No Data Found !",
        errorMessage: resData.errorMessage,
      });
    }

    dispatch({
      type: GET_SALES,
      sales: resData.salesData,
    });
  };
};

export const openSales = (id) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(`${mainLink}/api/sales/opened/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        userId: user._id,
      }),
    });

    const resData = await response.json();
  };
};

export const setIsFinal = (id) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const startDate = window.localStorage.getItem("startDate");
    const endDate = window.localStorage.getItem("endDate");

    console.log(startDate, endDate);

    const response = await fetch(`${mainLink}/api/sales/set_final/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        userId: user._id,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    getSales(startDate, endDate);
  };
};
