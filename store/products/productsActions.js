import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const DELETE_ITEM = "DELETE_ITEM";
export const EDIT_PRODUCT = "EDIT_PRODUCT";

//getting all products for certain business

export const getBusinessProducts = () => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(`${mainLink}/api/products/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: GET_PRODUCTS,
      products: resData.products,
    });
  };
};

// adding new product
export const addProduct = (
  businessId,
  productName,
  productNickName,
  productType,
  costPrice,
  retailPrice,
  sellingPrice,
  description,
  imageURL,
  minimumDiscount,
  maximumDiscount,
  category,
  quantity
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        userId: user._id,
        businessId,
        productName,
        productNickName,
        productType,
        costPrice,
        retailPrice,
        sellingPrice,
        description,
        imageURL,
        minimumDiscount,
        maximumDiscount,
        category,
        quantity,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: ADD_PRODUCT,
      productData: {
        productName,
        productNickName,
        productType,
        costPrice,
        retailPrice,
        sellingPrice,
        description,
        imageURL,
        minimumDiscount,
        maximumDiscount,
        category,
        quantity,
      },
    });
  };
};

// editing product
export const editProduct = (
  productId,
  productName,
  productNickName,
  productType,
  costPrice,
  retailPrice,
  sellingPrice,
  description,
  imageURL,
  minimumDiscount,
  maximumDiscount,
  category,
  quantity
) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/products`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        productId,
        productName,
        productNickName,
        productType,
        costPrice,
        retailPrice,
        sellingPrice,
        description,
        imageURL,
        minimumDiscount,
        maximumDiscount,
        category,
        quantity,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: EDIT_PRODUCT,
      product: {
        productId,
        productName,
        productNickName,
        productType,
        costPrice,
        retailPrice,
        sellingPrice,
        description,
        imageURL,
        minimumDiscount,
        maximumDiscount,
        category,
        quantity,
      },
    });
  };
};

// deleting product
export const deleteItem = (id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: DELETE_ITEM,
      productId: id,
    });
  };
};
