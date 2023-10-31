import {
  ADD_CLIENT,
  DELETE_CLIENT,
  EDIT_CLIENT,
  GET_CLIENTS,
} from "./clientsActions";

const initialState = {
  clients: [],
};

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.clients,
      };
    case ADD_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.client],
      };
    case EDIT_CLIENT:
      const clientIndex = state.clients.findIndex(
        (client) => client._id === action.client._id
      );
      const updatedClients = [...state.clients];
      updatedClients[clientIndex] = action.client;
      return {
        ...state,
        clients: updatedClients,
      };
    case DELETE_CLIENT:
      const updatedClientsList = state.clients.filter(
        (client) => client._id !== action.clientId
      );
      return {
        ...state,
        clients: updatedClientsList,
      };
    default:
      return state;
  }
};
