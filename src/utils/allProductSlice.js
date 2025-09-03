import { createSlice } from "@reduxjs/toolkit";

const allProductSlice = createSlice({
  name: "allProducts",
  initialState: [],
  reducers: {
    addAllProducts: (state, action) => {
      return action.payload;
    },
  },
});

export const { addAllProducts } = allProductSlice.actions;

export default allProductSlice.reducer;
