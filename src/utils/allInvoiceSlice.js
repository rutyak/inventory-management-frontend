import { createSlice } from "@reduxjs/toolkit";

const allInvoiceSlice = createSlice({
  name: "allInvoices",
  initialState: [],
  reducers: {
    addAllInvoices: (state, action) => {
      return action.payload;
    },
    addInvoiceData: (state, action) => {
      state.push(action.payload);
    },
    updateAllInvoice: (state, action) => {
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
    incrementOpenCount: (state, action) => {
      const invoiceId = action.payload;
      const invoice = state?.find((inv) => inv._id === invoiceId);
      if (invoice) {
        invoice.openCount = (invoice.openCount || 0) + 1;
      }
    },
    removeAllInvoice: (state, action) => {
      const invoiceId = action.payload;
      return state.filter((inv) => inv._id !== invoiceId);
    },
  },
});

export const {
  addAllInvoices,
  updateAllInvoice,
  incrementOpenCount,
  removeAllInvoice,
  addInvoiceData,
} = allInvoiceSlice.actions;

export default allInvoiceSlice.reducer;
