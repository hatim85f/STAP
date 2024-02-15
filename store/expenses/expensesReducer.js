import { ADD_FIXED_EXPENSES, ADD_VARIABLE_EXPENSES } from "./expensesActions";

const initialState = {
  fixedExpenses: [],
  variableExpenses: [],
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
    default:
      return state;
  }
};
