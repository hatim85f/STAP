import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const ADD_FIXED_EXPENSES = "ADD_FIXED_EXPENSES";
export const ADD_VARIABLE_EXPENSES = "ADD_VARIABLE_EXPENSES";

export const addFixedExpenses = (
  businessId,
  currency,
  title,
  amount,
  category,
  categoryOtherText,
  description,
  recurringDay,
  dueIn,
  recurringType,
  source
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/fixed-expenses/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        userId: user._id,
        businessId,
        currency,
        title,
        amount,
        category,
        categoryOtherText,
        description,
        recurringDay,
        dueIn,
        recurringType,
        source,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: ADD_FIXED_EXPENSES,
      fixedExpense: resData.fixedExpense,
    });
  };
};

export const addVariableExpenses = (
  businessId,
  title,
  currency,
  amount,
  category,
  categoryOtherText,
  description,
  expenseDate,
  isReceiptAvailable,
  receiptImage,
  receiptAmount,
  receiptDate,
  receiptCurrency,
  source
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/variable-expenses/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },

      body: JSON.stringify({
        userId: user._id,
        businessId,
        title,
        currency,
        amount,
        category,
        categoryOtherText,
        description,
        expenseDate,
        isReceiptAvailable,
        receiptImage,
        receiptAmount,
        receiptDate,
        receiptCurrency,
        source,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: ADD_VARIABLE_EXPENSES,
      variableExpense: resData.variableExpense,
    });
  };
};
