import { mainLink } from "../mainLink";
import { ERROR } from "../auth/authActions";

export const GET_PHASING = "GET_PHASING";
export const ADD_PHASING = "ADD_PHASING";
export const ADD_TARGET = "ADD_TARGET";
export const GET_TARGETS = "GET_TARGETS";

export const getPhasing = () => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(`${mainLink}/api/phasing/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    dispatch({
      type: GET_PHASING,
      phasing: resData.phasing,
    });
  };
};

export const addTarget = (
  productId,
  businessId,
  targetUnits,
  productPrice,
  targetType,
  phasing,
  phasingData,
  startPeriod
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/targets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
        "user-id": user._id,
      },
      body: JSON.stringify({
        productId,
        businessId,
        targetUnits,
        productPrice,
        targetType,
        phasing,
        phasingData,
        startPeriod,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: ADD_TARGET,
      target: resData.target,
    });
  };
};

export const getTarget = (year) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/targets/${user._id}/${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    // if (resData.message === "No target found for null") {
    //   return;
    // } else {
    //   dispatch({
    //     type: ERROR,
    //     error: resData.error,
    //     errorMessage: `Target for ${year} has been fetched`,
    //   });
    // }

    dispatch({
      type: GET_TARGETS,
      target: resData.target,
    });
  };
};

export const addTeamTarget = (userTargetData, year) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(`${mainLink}/api/userTarget`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
        "user-id": user._id,
      },
      body: JSON.stringify({
        userTargetData,
        year,
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
