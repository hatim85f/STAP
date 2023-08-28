import { CLEAR_MESSAGE, SYSTEM_MESSAGE } from "./messagesActions";

const initialState = {
  showSystemMessage: false,
  systemMessage: "",
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SYSTEM_MESSAGE:
      return {
        ...state,
        showSystemMessage: true,
        systemMessage: action.message,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        showSystemMessage: false,
        systemMessage: "",
      };
    default:
      return state;
  }
};
