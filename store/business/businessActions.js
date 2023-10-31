import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const ADD_BUSINESS = "ADD_BUSINESS";
export const GET_USER_BUSINESSES = "GET_USER_BUSINESSES";
export const EDIT_BUSINESS = "EDIT_BUSINESS";
export const DELETE_BUSINESS = "DELETE_BUSINESS";

export const getUserBusiness = () => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(`${mainLink}/api/business/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    let team = [];
    const businessDetails = resData.userBusiness;

    for (let data of businessDetails) {
      team.push({
        businessId: data.business._id,
        teamMembers: data.teamMembers,
      });
    }

    dispatch({
      type: GET_USER_BUSINESSES,
      payload: resData.userBusiness,
      team: team,
    });
  };
};

export const addBusiness = (
  businessLogo,
  businessName,
  businessType,
  businessDescription,
  officeLocation,
  contactPerson,
  contactPersonEmail,
  contactNumber,
  numberOfEmployees,
  webSite,
  currencyCode,
  currencyName,
  currencySymbol
) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(`${mainLink}/api/business/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        businessLogo,
        businessName,
        businessType,
        businessDescription,
        officeLocation,
        contactPerson,
        contactPersonEmail,
        contactNumber,
        numberOfEmployees,
        webSite,
        userId: user._id,
        currencyCode,
        currencyName,
        currencySymbol,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done !",
      errorMessage: resData.message,
    });

    dispatch({
      type: ADD_BUSINESS,
      payload: {
        businessLogo,
        businessName,
        businessType,
        businessDescription,
        officeLocation,
        contactPerson,
        contactPersonEmail,
        contactNumber,
        numberOfEmployees,
        webSite,
        userId: user._id,
        currencyCode,
        currencyName,
        currencySymbol,
      },
    });
  };
};

export const editBusiness = (
  businessLogo,
  businessName,
  businessType,
  businessDescription,
  officeLocation,
  contactPerson,
  contactPersonEmail,
  contactNumber,
  numberOfEmployees,
  webSite,
  businessId,
  currencyCode,
  currencyName,
  currencySymbol
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/business/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        businessLogo,
        businessName,
        businessType,
        businessDescription,
        officeLocation,
        contactPerson,
        contactPersonEmail,
        contactNumber,
        numberOfEmployees,
        webSite,
        businessId,
        currencyCode,
        currencyName,
        currencySymbol,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done !",
      errorMessage: resData.message,
    });

    dispatch({
      type: EDIT_BUSINESS,
      payload: {
        businessLogo,
        businessName,
        businessType,
        businessDescription,
        officeLocation,
        contactPerson,
        contactPersonEmail,
        contactNumber,
        numberOfEmployees,
        webSite,
        businessId,
        currencyCode,
        currencyName,
        currencySymbol,
      },
    });
  };
};

export const deleteBusiness = (businessId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/business/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        businessId,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done !",
      errorMessage: resData.message,
    });

    dispatch({
      type: DELETE_BUSINESS,
      payload: businessId,
    });
  };
};
