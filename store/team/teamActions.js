import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const INVITE_MEMBER = "INVITE_MEMBER";

export const inviteMember = (
  email,
  password,
  userName,
  firstName,
  lastName,
  phone,
  designation,
  userType,
  businessId,
  url
) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(`${mainLink}/api/team`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        email,
        password,
        userName,
        firstName,
        lastName,
        phone,
        designation,
        userType,
        businessId,
        invitor: user.userName,
        invitorDesignation: user.designation,
        url,
      }),
    });

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: INVITE_MEMBER,
      member: {
        email,
        userName,
        firstName,
        lastName,
        phone,
        designation,
        userType,
        isActivated: false,
      },
    });
  };
};
