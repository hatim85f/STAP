import {
  ADD_SUPPLIER,
  DELETE_SUPPLIER,
  EDIT_SUPPLIER,
  GET_SUPPLIERS,
} from "./suppliersActions";

const initialState = {
  suppliers: [],
};

export const suppliersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.suppliers,
      };
    case ADD_SUPPLIER:
      return {
        ...state,
        suppliers: state.suppliers.push(action.supplier),
      };
    case DELETE_SUPPLIER:
      return {
        ...state,
        suppliers: state.suppliers.filter(
          (supplier) => supplier._id !== action.supplierId
        ),
      };
    case EDIT_SUPPLIER:
      const updatedSuppliers = state.suppliers.map((supplier) => {
        if (supplier._id === action.supplierId) {
          return {
            ...supplier,
            ...action.supplier,
          };
        }
        return supplier;
      });

      return {
        ...state,
        suppliers: updatedSuppliers,
      };
    default:
      return state;
  }
};
