import { mainLink } from "../mainLink";
// import stripe from "@stripe/stripe-react-native";
import { ERROR } from "../auth/authActions";
import * as process from "process";

export const GET_PACKAGES = "GET_PACKAGES";
export const ADD_MEMBERSHIP = "ADD_MEMBERSHIP";

export const getPackages = () => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/api/packages`);
    const resData = await response.json();

    dispatch({
      type: GET_PACKAGES,
      packages: resData.packages,
    });
  };
};

export const addMemberShip = (
  packageId,
  type,
  payment,
  autoRenew,
  lastFourDigits,
  savePaymentMethod,
  stripeToken,
  nextBillingDate
) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    // Now you have the payment token, you can send it to your backend
    // along with other necessary data like email, packageId, type, etc.
    const response = await fetch(`${mainLink}/api/membership`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Send the user token as a bearer token
        "x-auth-token": token, // Send the user token as a custom header as well
      },
      body: JSON.stringify({
        userId: user._id,
        packageId,
        type,
        payment,
        autoRenew,
        lastFourDigits,
        savePaymentMethod,
        token: stripeToken, // Send the payment token ID to your backend
        nextBillingDate,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Success",
      errorMessage: resData.message,
    });

    dispatch({
      type: ADD_MEMBERSHIP,
      action: resData.membership,
    });
  };
};

export const upgradeSubscription = (
  packageId,
  type,
  payment,
  autoRenew,
  savePaymentMethod,
  nextBillingDate,
  isUpgrade
) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/membership/upgrade-subscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          userId: user._id,
          packageId,
          type,
          payment,
          autoRenew,
          savePaymentMethod,
          nextBillingDate,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Success",
      errorMessage: resData.message,
    });

    dispatch({
      type: ADD_MEMBERSHIP,
      action: resData.membership,
    });
  };
};

export const cancelMembership = (packageId) => {
  return async (dispatch, getState) => {
    const { token, user, stripeSubscriptions } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/membership/cancel-subscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          userId: user._id,
          packageId,
          stripeSubscriptionId: stripeSubscriptions[0],
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Success",
      errorMessage: resData.message,
    });
  };
};
