import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const ADD_PARTNER = "ADD_PARTNER";
export const GET_PARTNERS = "GET_PARTNERS";
export const DELETE_PARTNER = "DELETE_PARTNER";

export const getPartners = () => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(`${mainLink}/api/partner/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
        "user-id": user._id,
      },
    });

    const resData = await response.json();

    dispatch({
      type: GET_PARTNERS,
      partners: resData,
    });
  };
};

export const addPartner = (
  business,
  name,
  email,
  phone,
  profileImage,
  address,
  idType,
  idImage,
  idNumber,
  idExpire,
  bankName,
  bankIBAN,
  percentage,
  dateOfStart,
  responsibilities,
  investementAmount,
  DOB,
  password
) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(`${mainLink}/api/partner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
        "user-id": user._id,
      },
      body: JSON.stringify({
        business,
        name,
        email,
        phone,
        profileImage,
        address,
        idType,
        idImage,
        idNumber,
        idExpire,
        bankName,
        bankIBAN,
        percentage,
        dateOfStart,
        responsibilities,
        investementAmount,
        DOB,
        password,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ADD_PARTNER,
      partnerData: {
        business,
        name,
        email,
        phone,
        profileImage,
        address,
        idType,
        idImage,
        idNumber,
        idExpire,
        bankName,
        bankIBAN,
        percentage,
        dateOfStart,
        responsibilities,
        investementAmount,
        DOB,
        password,
      },
    });

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};

export const deletePartner = (partnerId) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(`${mainLink}/api/partner/${partnerId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
        "user-id": user._id,
      },
    });

    const resData = await response.json();

    dispatch({
      type: DELETE_PARTNER,
      partnerId: partnerId,
    });

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};
