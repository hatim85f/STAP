import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";

//getting all products for certain business

export const getBusinessProducts = (businessId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/products?businessId=${businessId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    console.log(resData, "get resData");

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
  maximumDiscount
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
      },
    });
  };
};
