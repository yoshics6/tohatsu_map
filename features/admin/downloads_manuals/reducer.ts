import { createReducer } from "@reduxjs/toolkit";
import { getDownloadsManuals, getDownloadsManualsById } from "@/features/admin/downloads_manuals/actions";
import { DownloadsManualsState } from "@/models/downloads_manuals.model";

const initialState: DownloadsManualsState = {
  data: {
    dm_id: "",
    dm_subject: "",
    dm_date: "",
    dm_category: "",
    dm_horse_power: "",
    dm_stroke_models: "",
    dm_additional_file: "",
    dm_file: "",
    dm_status: "",
    dm_create_at: "",
  },
};

export const downloadsManualsReducer = createReducer(initialState, (builder) => {
  builder.addCase(getDownloadsManuals.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getDownloadsManualsById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default downloadsManualsReducer;
