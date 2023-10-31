import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const GET_CLIENTS = "GET_CLIENTS";
export const ADD_CLIENT = "ADD_CLIENT";
export const EDIT_CLIENT = "EDIT_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT";

export const getClients = () => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/clients/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        errorMessage: resData.message,
      });
    }

    dispatch({
      type: GET_CLIENTS,
      clients: resData.clients,
    });
  };
};

export const addClient = (
  clientName,
  businessId,
  clientType,
  address,
  contactPersonName,
  contactPersonEmail,
  contactPersonPhone,
  logoURL,
  personInHandleId
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/clients/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        clientName,
        businessId,
        clientType,
        address,
        contactPersonName,
        contactPersonEmail,
        contactPersonPhone,
        logoURL,
        personInHandleId,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Success",
      errorMessage: resData.message,
    });

    dispatch({
      type: ADD_CLIENT,
      client: {
        clientName,
        businessId,
        clientType,
        address,
        contactPersonName,
        contactPersonEmail,
        contactPersonPhone,
        logoURL,
        personInHandleId,
      },
    });
  };
};

export const editClient = (
  clientId,
  clientName,
  businessId,
  clientType,
  address,
  contactPersonName,
  contactPersonEmail,
  contactPersonPhone,
  logoURL,
  personInHandleId,
  personInHandle
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/clients/${clientId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
        "user-id": user._id,
      },
      body: JSON.stringify({
        clientName,
        businessId,
        clientType,
        address,
        contactPersonName,
        contactPersonEmail,
        contactPersonPhone,
        logoURL,
        personInHandleId,
        personInHandle,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Success",
      errorMessage: resData.message,
    });

    dispatch({
      type: EDIT_CLIENT,
      client: {
        clientName,
        businessId,
        clientType,
        address,
        contactPersonName,
        contactPersonEmail,
        contactPersonPhone,
        logoURL,
        personInHandleId,
        personInHandle,
      },
    });
  };
};

export const deleteClient = (clientId) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/clients/${clientId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
        "user-id": user._id,
      },
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Success",
      errorMessage: resData.message,
    });

    dispatch({
      type: DELETE_CLIENT,
      clientId,
    });
  };
};
