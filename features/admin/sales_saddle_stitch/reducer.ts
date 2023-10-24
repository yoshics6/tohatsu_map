import { createReducer } from "@reduxjs/toolkit";
import {
  getSalesSaddleStitch,
  getSalesSaddleStitchById,
} from "@/features/admin/sales_saddle_stitch/actions";
import { SalesSaddleStitchState } from "@/models/sales_saddle_stitch.model";

const initialState: SalesSaddleStitchState = {
  data: {
    sals_sadd_id: "",
    sals_sadd_date: "",
    sals_sadd_company_name: "",
    sals_sadd_tel: "",
    sals_sadd_email: "",
    sals_sadd_doc_type: "",
    sals_sadd_printing_type: "",
    sals_sadd_amount: "",
    sals_sadd_quotation_request: "",
    sals_sadd_finished_size: "",
    sals_sadd_cover: "",
    sals_sadd_text: "",
    sals_sadd_cover_paper: "",
    sals_sadd_text_paper: "",
    sals_sadd_printing: "",
    sals_sadd_cover_coating: "",
    sals_sadd_text_coating: "",
    sals_sadd_printing_volume: "",
  },
};

export const salesSaddleStitchReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(getSalesSaddleStitch.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getSalesSaddleStitchById.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  }
);

export default salesSaddleStitchReducer;
