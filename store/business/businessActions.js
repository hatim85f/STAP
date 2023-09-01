import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const ADD_BUSINESS = "ADD_BUSINESS";
export const GET_USER_BUSINESSES = "GET_USER_BUSINESSES";

export const getUserBusiness = () => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/business/all/?userId=${user._id}`,
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
      type: GET_USER_BUSINESSES,
      payload: resData.userBusiness,
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
  webSite
) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(`${mainLink}/api/business/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-atuh-token": token,
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
      },
    });
  };
};
