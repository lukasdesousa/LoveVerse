import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage"; // Armazena no localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import themeSlice from "./themeSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "theme"],
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
  theme: persistReducer(persistConfig, themeSlice),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
