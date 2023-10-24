import { createReducer } from "@reduxjs/toolkit";
import {
  getSalesEnvelope,
  getSalesEnvelopeById,
} from "@/features/admin/sales_envelope/actions";
import { SalesEnvelopeState } from "@/models/sales_envelope.model";

const initialState: SalesEnvelopeState = {
  data: {
    sals_enve_id: "",
    sals_enve_date: "",
    sals_enve_fullname: "",
    sals_enve_company_name: "",
    sals_enve_tel: "",
    sals_enve_email: "",
    sals_enve_doc_type: "",
    sals_enve_printing_type: "",
    sals_enve_amount: "",
    sals_enve_quotation_request: "",
    sals_enve_finished_size: "",
    sals_enve_page: "",
    sals_enve_paper: "",
    sals_enve_printing: "",
    sals_enve_coating: "",
    sals_enve_printing_volume: "",
  },
};

export const salesEnvelopeReducer = createReducer(initialState, (builder) => {
  builder.addCase(getSalesEnvelope.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getSalesEnvelopeById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default salesEnvelopeReducer;
