import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import movieReducer from "../features/movie/movieSlice";
import userReducer, { setUserLogin } from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [setUserLogin],
      },
    }).concat(logger),
});
