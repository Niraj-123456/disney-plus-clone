import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.user = {
        displayName: action.payload?.displayName,
        email: action.payload?.email,
        photoURL: action.payload?.photoURL,
        token: {
          accessToken: action.payload?.stsTokenManager?.accessToken,
          expirationTime: action.payload?.stsTokenManager?.expirationTime,
          refreshToken: action.payload?.stsTokenManager?.refreshToken,
        },
      };
    },
    setSignOut: (state) => {
      state.user = null;
    },
  },
});

export const { setUserLogin, setSignOut } = userSlice.actions;

export const currentUser = (state) => state.user?.user;

export default userSlice.reducer;
