import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const ADD_PURCHASE = "ADD_PURCHASE";
export const GET_PURCHASES = "GET_PURCHASES";
export const DELETE_PURCHASE = "DELETE_PURCHASE";

export const getPurchase = (startMonth, endMonth, year) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    console.log({
      startMonth,
      endMonth,
      year,
      userId: user._id,
    });

    const response = await fetch(
      `${mainLink}/api/purchaseOrder/${user._id}/${startMonth}/${endMonth}/${year}`,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    dispatch({
      type: GET_PURCHASES,
      purchases: resData.purchaseOrders,
    });
  };
};

export const addPurchase = (order, supplier, totalBill) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(`${mainLink}/api/purchaseOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        order,
        supplier,
        totalBill,
        userId: user._id,
      }),
    });

    const resData = await response.json();

    console.log(resData.purchase);

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Success",
      errorMessage: resData.message,
    });

    dispatch({
      type: ADD_PURCHASE,
      order: resData.purchase,
    });
  };
};
