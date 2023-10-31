import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const INVITE_MEMBER = "INVITE_MEMBER";
export const EDIT_MEMBER = "EDIT_MEMBER";
export const DELETE_MEMBER = "DELETE_MEMBER";

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
        userId: user._id,
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

export const editTeamMember = (
  memberId,
  designation,
  userType,
  isAuthorized
) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/team/${memberId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        designation,
        userType,
        isAuthorized,
        authority: ["Sales", "Team"],
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: EDIT_MEMBER,
      memberId,
      designation,
      userType,
      isAuthorized,
      authority,
    });
  };
};

export const deleteTeamMember = (memberId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/team/${memberId}`, {
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
      type: DELETE_MEMBER,
      memberId,
    });
  };
};
