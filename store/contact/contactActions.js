import { mainLink } from "../mainLink";

import { ERROR } from "../auth/authActions";

export const sendContact = (title, description) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        title,
        description,
        userId: user._id,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};
