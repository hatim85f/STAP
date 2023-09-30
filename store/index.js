import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authReducers";
import { messagesReducer } from "./messages/messagesReducer";
import { businessReducer } from "./business/businessReducer";
import { productsReducer } from "./products/productsReducer";
import { teamReducer } from "./team/teamReducer";
import { settingsReducer } from "./settings/settingsReducer";
import { membershipReducer } from "./membership/MembershipReducer";

const mainStore = configureStore({
  reducer: {
    messages: messagesReducer,
    auth: authReducer,
    business: businessReducer,
    products: productsReducer,
    team: teamReducer,
    settings: settingsReducer,
    membership: membershipReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
});
export default mainStore;
