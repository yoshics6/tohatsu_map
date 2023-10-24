import { createReducer } from "@reduxjs/toolkit";
import {
  getTextPaper,
  addTextPaper,
  getTextPaperById,
} from "@/features/admin/text_paper/actions";
import { TextPaperState } from "@/models/text_paper.model";

const initialState: TextPaperState = {
  data: {
    text_id: 0,
    text_name: "",
  },
};

export const textPaperReducer = createReducer(initialState, (builder) => {
  builder.addCase(getTextPaper.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getTextPaperById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default textPaperReducer;
