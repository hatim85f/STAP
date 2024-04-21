import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const ADD_FIXED_EXPENSES = "ADD_FIXED_EXPENSES";
export const ADD_VARIABLE_EXPENSES = "ADD_VARIABLE_EXPENSES";
export const ADD_MARKETING_EXPENSES = "ADD_MARKETING_EXPENSES";
export const GET_FIXED_EXPENSES = "GET_FIXED_EXPENSES";
export const DELETE_FIXED_EXPENSES = "DELETE_FIXED_EXPENSES";
export const EDIT_FIXED_EXPENSES = "EDIT_FIXED_EXPENSES";
export const GET_VARIABLE_EXPENSES = "GET_VARIABLE_EXPENSES";
export const DELETE_VARIABLE_EXPENSES = "DELETE_VARIABLE_EXPENSES";
export const EDIT_VARIABLE_EXPENSES = "EDIT_VARIABLE_EXPENSES";
export const GET_MARKETING_EXPENSES = "GET_MARKETING_EXPENSES";

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

export const addMarketingExpenses = (
  businessId,
  requestAgainst,
  requestedFor,
  rationale,
  amount,
  currency,
  dueIn,
  kindOfExpense
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/marketing-expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        businessId,
        requestedBy: user._id,
        requestAgainst,
        requestedFor,
        rationale,
        amount,
        currency,
        dueIn,
        kindOfExpense,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: ADD_MARKETING_EXPENSES,
      marketingExpense: resData.marketingExpense,
    });
  };
};

export const getFixedExpenses = (month, year) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/fixed-expenses/${user._id}/${month}/${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    if (resData.businessExpenses.length === 0) {
      dispatch({
        type: ERROR,
        error: "No Fixed Expenses",
        errorMessage: "No Fixed Expenses for the requested Month and Year",
      });
    }

    dispatch({
      type: GET_FIXED_EXPENSES,
      fixedExpenses: resData.businessExpenses,
    });
  };
};

export const deleteFixedExpenses = (expenseId) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/fixed-expenses/${expenseId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: DELETE_FIXED_EXPENSES,
      expenseId,
    });
  };
};

export const editFixedExpenses = (
  expenseId,
  currency,
  amount,
  category,
  categoryOtherText,
  description,
  recurringDay,
  dueIn,
  businessId,
  source,
  recurringType
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/fixed-expenses/${expenseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          currency,
          amount,
          category,
          categoryOtherText,
          description,
          recurringDay,
          dueIn,
          businessId,
          source,
          recurringType,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};

export const getVariableExpenses = (month, year) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/variable-expenses/${user._id}/${month}/${year}`,
      {
        method: "GET",
        headers: {
          "Contetnt-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    dispatch({
      type: GET_VARIABLE_EXPENSES,
      variableExpenses: resData.variableExpenses,
    });
  };
};

export const deleteVariableExpenses = (expenseId) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/variable-expenses/${expenseId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    dispatch({
      type: DELETE_VARIABLE_EXPENSES,
      expenseId,
    });

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};

export const editVariableExpenses = (
  expenseId,
  currency,
  businessId,
  title,
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
    const { token, user } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/variable-expenses/${expenseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          currency,
          businessId,
          title,
          amount,
          category,
          categoryOtherText,
          userId: user._id,
          description,
          expenseDate,
          isReceiptAvailable,
          receiptImage,
          receiptAmount,
          receiptDate,
          receiptCurrency,
          source,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};

export const getMarketingExpenses = (month, year) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/marketing-expenses/${user._id}/${month}/${year}`,
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
      type: GET_MARKETING_EXPENSES,
      marketingExpenses: resData.expenses,
      previousExpenses: resData.previousMonthExpenses,
    });
  };
};

export const editStatus = (expenseId, status, comment) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/marketing-expenses/approval/${expenseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
          "user-id": user._id,
        },
        body: JSON.stringify({
          newStatus: status,
          statusChangedBy: user._id,
          statusComment: comment,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};

export const updateReceipt = (
  expenseId,
  receiptImage,
  receiptAmount,
  receiptCurrency
) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `${mainLink}/api/marketing-expenses/submit-receipt/${expenseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getState().auth.token,
        },
        body: JSON.stringify({
          receiptImage,
          receiptAmount,
          receiptCurrency,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};

export const revisedExpense = (
  expenseId,
  revisionComment,
  isRevisionPassed
) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/marketing-expenses/revision/${expenseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
          "user-id": user._id,
        },
        body: JSON.stringify({
          revisionComment,
          revisedBy: user._id,
          isRevisionPassed,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};

export const claimedExpense = (expenseId) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/marketing-expenses/claimed/${expenseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
          "user-id": user._id,
        },
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};

export const closeCase = (expenseId) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/marketing-expenses/close/${expenseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
          "user-id": user._id,
        },
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};
