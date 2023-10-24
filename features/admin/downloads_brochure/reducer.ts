import { createReducer } from "@reduxjs/toolkit";
import { getDownloadsBrochure, getDownloadsBrochureById } from "@/features/admin/downloads_brochure/actions";
import { DownloadsBrochureState } from "@/models/downloads_brochure.model";

const initialState: DownloadsBrochureState = {
  data: {
    db_id: "",
    db_subject: "",
    db_date: "",
    db_category: "",
    db_file: "",
    db_status: "",
    db_create_at: "",
  },
};

export const downloadsBrochureReducer = createReducer(initialState, (builder) => {
  builder.addCase(getDownloadsBrochure.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getDownloadsBrochureById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default downloadsBrochureReducer;
