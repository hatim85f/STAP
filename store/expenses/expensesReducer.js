import {
  ADD_FIXED_EXPENSES,
  ADD_MARKETING_EXPENSES,
  ADD_VARIABLE_EXPENSES,
  DELETE_FIXED_EXPENSES,
  DELETE_VARIABLE_EXPENSES,
  GET_FIXED_EXPENSES,
  GET_MARKETING_EXPENSES,
  GET_VARIABLE_EXPENSES,
} from "./expensesActions";

const initialState = {
  fixedExpenses: [],
  variableExpenses: [],
  marketingExpenses: [],
  previousExpenses: [],
};

export const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FIXED_EXPENSES:
      return {
        ...state,
        fixedExpenses: state.fixedExpenses.concat(action.fixedExpense),
      };
    case ADD_VARIABLE_EXPENSES:
      return {
        ...state,
        variableExpenses: state.variableExpenses.concat(action.variableExpense),
      };
    case ADD_MARKETING_EXPENSES:
      return {
        ...state,
        marketingExpenses: state.marketingExpenses.concat(
          action.marketingExpense
        ),
      };
    case GET_FIXED_EXPENSES:
      return {
        ...state,
        fixedExpenses: action.fixedExpenses,
      };
    case GET_VARIABLE_EXPENSES:
      return {
        ...state,
        variableExpenses: action.variableExpenses,
      };
    case GET_MARKETING_EXPENSES:
      return {
        ...state,
        marketingExpenses: action.marketingExpenses,
        previousExpenses: action.previousExpenses,
      };
    case DELETE_FIXED_EXPENSES:
      return {
        ...state,
        fixedExpenses: state.fixedExpenses.filter(
          (expense) => expense._id !== action.expenseId
        ),
      };
    case DELETE_VARIABLE_EXPENSES:
      return {
        ...state,
        variableExpenses: state.variableExpenses.filter(
          (expense) => expense._id !== action.expenseId
        ),
      };

    default:
      return state;
  }
};
