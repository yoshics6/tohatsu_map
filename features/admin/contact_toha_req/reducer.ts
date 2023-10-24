import { createReducer } from "@reduxjs/toolkit";
import { getContactTohaReq, getContactTohaReqById } from "@/features/admin/contact_toha_req/actions";
import { ContactTohaReqState } from "@/models/contact_toha_req.model";

const initialState: ContactTohaReqState = {
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
    contact_message: "",
    contact_telephone: "",
    contact_model: "",
    contact_serial_number: "",
    contact_horsepower: "",
  },
};

export const contactTohaReqReducer = createReducer(initialState, (builder) => {
  builder.addCase(getContactTohaReq.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getContactTohaReqById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default contactTohaReqReducer;
