import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const GET_ORDERS = "GET_ORDERS";
export const GET_ORDERS_SUCCESS = "GET_ORDERS_SUCCESS";
export const GET_ORDERS_FAILURE = "GET_ORDERS_FAILURE";
export const ADD_ORDER = "ADD_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const DELETE_ITEM = "DELETE_ITEM";
export const EDIT_ITEM = "EDIT_ITEM";

export const getOrders = (startDate, endDate) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/orders/${user._id}/${startDate}/${endDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    dispatch({
      type: GET_ORDERS,
      payload: resData.orders,
    });
  };
};

export const addOrder = (
  orderId,
  productId,
  quantity,
  discount,
  discountType,
  bonusUnits,
  productPrice,
  totalValue,
  businessId
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/orders/add_order/${orderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          productId,
          quantity,
          discount,
          discountType,
          bonusUnits,
          productPrice,
          totalValue,
          userId: user._id,
          businessId,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: ADD_ORDER,
      payload: resData,
    });
  };
};

export const deleteOrder = (orderId, startDate, endDate) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/orders`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        orderId,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: DELETE_ORDER,
      orderId,
    });

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};

export const deleteItem = (itemId, orderId) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/orders/order_product/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: DELETE_ITEM,
      itemId,
      orderId,
    });

    getOrders(startDate, endDate);
  };
};

export const editItem = (
  orderPorductId,
  productId,
  quantity,
  discount,
  discountType,
  bonusUnits,
  productPrice,
  totalValue,
  businessId,
  mainOrderId,
  startDate,
  endDate
) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/orders/order_product/${orderPorductId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          productId,
          quantity,
          discount,
          discountType,
          bonusUnits,
          productPrice,
          totalValue,
          userId: user._id,
          businessId,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: EDIT_ITEM,
      payload: {
        productId,
        quantity,
        discount,
        discountType,
        bonusUnits,
        productPrice,
        totalValue,
        userId: user._id,
        businessId,
      },
      mainOrderId,
    });

    getOrders(startDate, endDate);
  };
};

export const changeOrderStatus = (orderId, status) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/orders/status/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        status,
      }),
    });

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};
