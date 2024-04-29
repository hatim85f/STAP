import { mainLink } from "../mainLink";

import { ERROR } from "../auth/authActions";

export const GET_PROFIT = "GET_PROFIT";
export const GET_USER_PERFORMANCE = "GET_USER_PERFORMANCE";

export const getProfit = (startMonth, endMonth, year) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/profit/${user._id}/${startMonth}/${endMonth}/${year}/`,
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
        error: resData.error,
        errorMessage: resData.message,
      });
    }

    dispatch({
      type: GET_PROFIT,
      profit: resData.businessesProfit,
    });
  };
};

export const getProfitForProduct = (
  startMonth,
  endMonth,
  year,
  selectedProduct
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/profit/${user._id}/${startMonth}/${endMonth}/${year}/${selectedProduct}`,
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
        error: resData.error,
        errorMessage: resData.message,
      });
    }

    dispatch({
      type: GET_PROFIT,
      profit: resData.businessesProfit,
    });
  };
};

export const getBusinessProfit = (startMonth, endMonth, year, businessId) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/profit/business_profit/${user._id}/${businessId}/${startMonth}/${endMonth}/${year}`,
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
        error: resData.error,
        errorMessage: resData.message,
      });
    }

    dispatch({
      type: GET_PROFIT,
      profit: [resData.businessesProfit],
    });
  };
};

export const getUserPerformance = (startMonth, endMonth, year, userId) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/personal_profit/${
        userId ? userId : user._id
      }/${startMonth}/${endMonth}/${year}`,
      {
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
        error: resData.error,
        errorMessage: resData.message,
      });
    }

    dispatch({
      type: GET_USER_PERFORMANCE,
      userPerformance: resData.personalAchievement,
      lastOrders: resData.lastOrders,
    });
  };
};
