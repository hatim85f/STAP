import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const ADD_BUSINESS = "ADD_BUSINESS";

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

    console.log(user._id, resData, "resData");

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
