import { createReducer } from "@reduxjs/toolkit";
import {
  getPrinting,
  addPrinting,
  getPrintingById,
} from "@/features/admin/printing/actions";
import { PrintingState } from "@/models/printing.model";

const initialState: PrintingState = {
  data: {
    printing_id: 0,
    printing_name: "",
  },
};

export const printingReducer = createReducer(initialState, (builder) => {
  builder.addCase(getPrinting.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getPrintingById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default printingReducer;
