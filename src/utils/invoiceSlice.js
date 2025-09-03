import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoices: (state, action) => action.payload,
    updateInvoice: (state, action) => {
      const { id, status, referenceNumber } = action.payload;
      const invoice = state.find((inv) => inv._id === id);
      if (invoice) {
        if (status) {
          invoice.status = status;
        }
        if (referenceNumber) {
          invoice.referenceNumber = referenceNumber;
        }
      }
    },
    removeInvoice: (state, action) => {
      return state.filter((invoice) => invoice._id !== action.payload);
    },
  },
});

export const { addInvoices, updateInvoice, removeInvoice } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
