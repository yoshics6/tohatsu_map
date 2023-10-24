import { createReducer } from "@reduxjs/toolkit";
import { getContactBrocReq, getContactBrocReqById } from "@/features/admin/contact_broc_req/actions";
import { ContactBrocReqState } from "@/models/contact_broc_req.model";

const initialState: ContactBrocReqState = {
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
  },
};

export const contactBrocReqReducer = createReducer(initialState, (builder) => {
  builder.addCase(getContactBrocReq.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getContactBrocReqById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default contactBrocReqReducer;
