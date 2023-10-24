import { createReducer } from "@reduxjs/toolkit";
import { getContactYearReq, getContactYearReqById } from "@/features/admin/contact_year_req/actions";
import { ContactYearReqState } from "@/models/contact_year_req.model";

const initialState: ContactYearReqState = {
  data: {
    contact_id: "",
    contact_date: "",
    contact_email: "",
    contact_first_name: "",
    contact_last_name: "",
    contact_address: "",
    contact_city: "",
    contact_province: "",
    contact_postal_code: "",
    contact_model: "",
    contact_serial_number: "",
    contact_message: ""
  },
};

export const contactYearReqReducer = createReducer(initialState, (builder) => {
  builder.addCase(getContactYearReq.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getContactYearReqById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default contactYearReqReducer;
