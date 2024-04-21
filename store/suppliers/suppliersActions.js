import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const GET_SUPPLIERS = "GET_SUPPLIERS";
export const ADD_SUPPLIER = "ADD_SUPPLIER";
export const DELETE_SUPPLIER = "DELETE_SUPPLIER";
export const EDIT_SUPPLIER = "EDIT_SUPPLIER";

export const getSuppliers = () => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/suppliers/${user._id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    dispatch({
      type: GET_SUPPLIERS,
      suppliers: resData.suppliers,
    });
  };
};

export const addSupplier = (
  supplierName,
  supplierEmail,
  supplierPhone,
  supplierAddress,
  supplierCity,
  contactPerson,
  contactPersonPhone,
  contactPersonEmail,
  paymentPeriod,
  currency
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/suppliers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        supplierName,
        supplierEmail,
        supplierPhone,
        supplierAddress,
        supplierCity,
        contactPerson,
        contactPersonPhone,
        contactPersonEmail,
        paymentPeriod,
        currency,
        userId: user._id,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Success",
      errorMessage: resData.message,
    });

    dispatch({
      type: ADD_SUPPLIER,
      supplier: {
        supplierName,
        supplierEmail,
        supplierPhone,
        supplierAddress,
        supplierCity,
        contactPerson,
        contactPersonPhone,
        contactPersonEmail,
        paymentPeriod,
        currency,
      },
    });
  };
};

export const deleteSupplier = (supplierId) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/suppliers/${supplierId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Success",
      errorMessage: resData.message,
    });

    dispatch({
      type: DELETE_SUPPLIER,
      supplierId,
    });
  };
};

export const editSupplier = (
  supplierId,
  supplierName,
  supplierEmail,
  supplierPhone,
  supplierAddress,
  supplierCity,
  contactPerson,
  contactPersonPhone,
  contactPersonEmail,
  paymentPeriod,
  currency
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/suppliers/${supplierId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        supplierName,
        supplierEmail,
        supplierPhone,
        supplierAddress,
        supplierCity,
        contactPerson,
        contactPersonPhone,
        contactPersonEmail,
        paymentPeriod,
        currency,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Success",
      errorMessage: resData.message,
    });

    dispatch({
      type: EDIT_SUPPLIER,
      supplier: {
        supplierId,
        supplierName,
        supplierEmail,
        supplierPhone,
        supplierAddress,
        supplierCity,
        contactPerson,
        contactPersonPhone,
        contactPersonEmail,
        paymentPeriod,
        currency,
      },
    });
  };
};
