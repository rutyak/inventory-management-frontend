import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./utils/productSlice";
import invoiceReducer from "./utils/invoiceSlice";
import allInvoiceReducer from "./utils/allInvoiceSlice";
import allProductReducer from "./utils/allProductSlice";
import userReducer from "./utils/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  products: productReducer,
  invoices: invoiceReducer,
  allInvoices: allInvoiceReducer,
  allProducts: allProductReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
