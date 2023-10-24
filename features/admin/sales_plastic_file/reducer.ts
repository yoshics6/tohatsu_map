import { createReducer } from "@reduxjs/toolkit";
import {
  getSalesPlasticFile,
  getSalesPlasticFileById,
} from "@/features/admin/sales_plastic_file/actions";
import { SalesPlasticFileState } from "@/models/sales_plastic_file.model";

const initialState: SalesPlasticFileState = {
  data: {
    sals_plas_id: "",
    sals_plas_date: "",
    sals_plas_fullname: "",
    sals_plas_company_name: "",
    sals_plas_tel: "",
    sals_plas_email: "",
    sals_plas_doc_type: "",
    sals_plas_printing_type: "",
    sals_plas_amount: "",
    sals_plas_quotation_request: "",
    sals_plas_finished_size: "",
    sals_plas_page: "",
    sals_plas_paper: "",
    sals_plas_printing: "",
    sals_plas_binding: "",
    sals_plas_printing_volume: "",
  },
};

export const salesplasticFileReducer = createReducer(initialState, (builder) => {
  builder.addCase(getSalesPlasticFile.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getSalesPlasticFileById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default salesplasticFileReducer;
