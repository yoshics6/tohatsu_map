import { createReducer } from "@reduxjs/toolkit";
import {
  getSalesCuttingSheet,
  getSalesCuttingSheetById,
} from "@/features/admin/sales_cutting_sheet/actions";
import { SalesCuttingSheetState } from "@/models/sales_cutting_sheet.model";

const initialState: SalesCuttingSheetState = {
  data: {
    sals_cutt_id: "",
    sals_cutt_date: "",
    sals_cutt_company_name: "",
    sals_cutt_tel: "",
    sals_cutt_email: "",
    sals_cutt_doc_type: "",
    sals_cutt_printing_type: "",
    sals_cutt_amount: "",
    sals_cutt_quotation_request: "",
    sals_cutt_finished_size: "",
    sals_cutt_page: "",
    sals_cutt_text_paper: "",
    sals_cutt_printing: "",
    sals_cutt_text_coating: "",
    sals_cutt_printing_volume: "",
  },
};

export const salesCuttingSheetReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(getSalesCuttingSheet.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getSalesCuttingSheetById.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  }
);

export default salesCuttingSheetReducer;
