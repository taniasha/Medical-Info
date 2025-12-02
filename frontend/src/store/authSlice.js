import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  role: "",
  mobile: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action) => {
      const { role, mobile } = action.payload;
      state.status = true;
      state.role = role;
      state.mobile = mobile;
    },
    signout: (state) => {
      state.status = false;
      state.role = "";
      state.mobile = "";
    },
  },
});

export const { signin, signout } = authSlice.actions;
export default authSlice.reducer;
