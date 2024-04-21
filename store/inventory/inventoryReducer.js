import { GET_INVENTORY } from "./inventoryActions";

const initialState = {
  inventory: [],
};

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTORY:
      return {
        ...state,
        inventory: action.inventory,
      };
    default:
      return state;
  }
};
