import { createReducer } from "@reduxjs/toolkit";
import {
  getSalesPaperBag,
  getSalesPaperBagById,
} from "@/features/admin/sales_paper_bag/actions";
import { SalesPaperBagState } from "@/models/sales_paper_bag.model";

const initialState: SalesPaperBagState = {
  data: {
    sals_papb_id: "",
    sals_papb_date: "",
    sals_papb_fullname: "",
    sals_papb_company_name: "",
    sals_papb_tel: "",
    sals_papb_email: "",
    sals_papb_doc_type: "",
    sals_papb_printing_type: "",
    sals_papb_amount: "",
    sals_papb_quotation_request: "",
    sals_papb_finished_size: "",
    sals_papb_page: "",
    sals_papb_paper: "",
    sals_papb_printing: "",
    sals_papb_coating: "",
    sals_papb_binding: "",
    sals_papb_printing_volume: "",
  },
};

export const salesPaperBagReducer = createReducer(initialState, (builder) => {
  builder.addCase(getSalesPaperBag.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getSalesPaperBagById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default salesPaperBagReducer;
