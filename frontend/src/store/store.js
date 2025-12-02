import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"; // Make sure to import persistStore
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import authReducer from "./authSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "auth",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "your-secret-key", // Move this to .env for production
      onError: (err) => console.log("Encryption error:", err),
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store); // Create persistor

export { store, persistor }; // Export both store and persistor
