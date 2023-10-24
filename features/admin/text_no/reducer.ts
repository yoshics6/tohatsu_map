import { createReducer } from "@reduxjs/toolkit";
import {
  getTextNo,
  addTextNo,
  getTextNoById,
} from "@/features/admin/text_no/actions";
import { TextNoState } from "@/models/text_no.model";

const initialState: TextNoState = {
  data: {
    text_no_id: 0,
    text_no_name: "",
  },
};

export const textNoReducer = createReducer(initialState, (builder) => {
  builder.addCase(getTextNo.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getTextNoById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default textNoReducer;
