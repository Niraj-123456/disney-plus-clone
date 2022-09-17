import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import movieReducer from "../features/movie/movieSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
