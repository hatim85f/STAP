import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authReducers";
import { messagesReducer } from "./messages/messagesReducer";

const mainStore = configureStore({
  reducer: {
    messages: messagesReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
});
export default mainStore;
