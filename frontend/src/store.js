import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import {apiSlice} from "./slices/apiSlice"
import { ioApiSlice } from "./slices/ioApiSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [ioApiSlice.reducerPath]: ioApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
