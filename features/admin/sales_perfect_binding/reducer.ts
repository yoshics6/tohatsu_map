import { createReducer } from "@reduxjs/toolkit";
import {
  getSalesPerfectBinding,
  getSalesPerfectBindingById,
} from "@/features/admin/sales_perfect_binding/actions";
import { SalesPerfectBindingState } from "@/models/sales_perfect_binding.model";

const initialState: SalesPerfectBindingState = {
  data: {
    sals_perf_id: "",
    sals_perf_date: "",
    sals_perf_company_name: "",
    sals_perf_tel: "",
    sals_perf_email: "",
    sals_perf_doc_type: "",
    sals_perf_printing_type: "",
    sals_perf_amount: "",
    sals_perf_quotation_request: "",
    sals_perf_finished_size: "",
    sals_perf_cover: "",
    sals_perf_text: "",
    sals_perf_cover_paper: "",
    sals_perf_text_paper: "",
    sals_perf_printing: "",
    sals_perf_cover_coating: "",
    sals_perf_text_coating: "",
    sals_perf_printing_volume: "",
  },
};

export const salesPerfectBindingReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(getSalesPerfectBinding.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getSalesPerfectBindingById.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  }
);

export default salesPerfectBindingReducer;
