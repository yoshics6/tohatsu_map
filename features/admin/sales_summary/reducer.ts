import { createReducer } from "@reduxjs/toolkit";
import {
  getSalesSummary,
  getSalesSummaryById,
} from "@/features/admin/sales_summary/actions";
import { SalesSummaryState } from "@/models/sales_summary.model";

const initialState: SalesSummaryState = {
  data: {
    sals_id: "",
    sals_date: "",
    sals_fullname: "",
    sals_company_name: "",
    sals_tel: "",
    sals_email: "",
    sals_doc_type: "",
    sals_printing_type: "",
    sals_amount: "",
    sals_quotation_request: "",
    sals_send_quotation: "",
  },
};

export const salesSummaryReducer = createReducer(initialState, (builder) => {
  builder.addCase(getSalesSummary.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getSalesSummaryById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default salesSummaryReducer;
