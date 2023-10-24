import { createReducer } from "@reduxjs/toolkit";
import {
  getSalesFolding,
  getSalesFoldingById,
} from "@/features/admin/sales_folding/actions";
import { SalesFoldingState } from "@/models/sales_folding.model";

const initialState: SalesFoldingState = {
  data: {
    sals_fold_id: "",
    sals_fold_date: "",
    sals_fold_company_name: "",
    sals_fold_tel: "",
    sals_fold_email: "",
    sals_fold_doc_type: "",
    sals_fold_printing_type: "",
    sals_fold_amount: "",
    sals_fold_quotation_request: "",
    sals_fold_finished_size: "",
    sals_fold_open_size: "",
    sals_fold_column: "",
    sals_fold_page: "",
    sals_fold_text_paper: "",
    sals_fold_printing: "",
    sals_fold_text_coating: "",
    sals_fold_printing_volume: "",
  },
};

export const salesFoldingReducer = createReducer(initialState, (builder) => {
  builder.addCase(getSalesFolding.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getSalesFoldingById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default salesFoldingReducer;
