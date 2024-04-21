import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authReducers";
import { messagesReducer } from "./messages/messagesReducer";
import { businessReducer } from "./business/businessReducer";
import { productsReducer } from "./products/productsReducer";
import { teamReducer } from "./team/teamReducer";
import { settingsReducer } from "./settings/settingsReducer";
import { membershipReducer } from "./membership/MembershipReducer";
import { targetReducer } from "./target/targetReducer";
import { ordersReducer } from "./orders/ordersReducer";
import { clientReducer } from "./clients/cleintReducer";
import { salesReducer } from "./sales/salesReducer";
import { expensesReducer } from "./expenses/expensesReducer";
import { partnersReducer } from "./partners/partnersReducer";
import { profitReducer } from "./profit/profitReducer";
import { suppliersReducer } from "./suppliers/suppliersReducer";
import { purchaseReducer } from "./purchases/purchaseReducer";
import { inventoryReducer } from "./inventory/inventoryReducer";

const mainStore = configureStore({
  reducer: {
    messages: messagesReducer,
    auth: authReducer,
    business: businessReducer,
    products: productsReducer,
    team: teamReducer,
    settings: settingsReducer,
    membership: membershipReducer,
    target: targetReducer,
    orders: ordersReducer,
    clients: clientReducer,
    sales: salesReducer,
    expenses: expensesReducer,
    partners: partnersReducer,
    profit: profitReducer,
    suppliers: suppliersReducer,
    purchases: purchaseReducer,
    inventory: inventoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
});
export default mainStore;
