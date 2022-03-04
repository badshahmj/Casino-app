import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    balance: 0,
  },
  reducers: {
    addBalance: (state, action) => {
      state.balance = state.balance + action.payload;
    },
  },
});

export const { addBalance } = userSlice.actions;

export const Balance = (state) => state.user.balance;

export default userSlice.reducer;
