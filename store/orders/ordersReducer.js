import {
  DELETE_ITEM,
  DELETE_ORDER,
  EDIT_ITEM,
  GET_ORDERS,
} from "./ordersActions";

const initialState = {
  orders: [],
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== action.orderId),
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case DELETE_ITEM:
      const orderIndex = state.orders.findIndex(
        (order) => order._id === action.orderId
      );

      const orderDetails = state.orders[orderIndex].details;
      const updatedOrderDetails = orderDetails.filter(
        (item) => item._id !== action.itemId
      );

      const updatedOrder = {
        ...state.orders[orderIndex],
        details: updatedOrderDetails,
      };

      const updatedOrders = [...state.orders];
      updatedOrders[orderIndex] = updatedOrder;

      return {
        ...state,
        orders: updatedOrders,
      };

    default:
      return state;
  }
};
