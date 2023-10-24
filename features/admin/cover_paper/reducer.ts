import { createReducer } from "@reduxjs/toolkit";
import {
  getCoverPaper,
  addCoverPaper,
  getCoverPaperById,
} from "@/features/admin/cover_paper/actions";
import { CoverPaperState } from "@/models/cover_paper.model";

const initialState: CoverPaperState = {
  data: {
    cp_id: 0,
    cp_name: "",
  },
};

export const coverPaperReducer = createReducer(initialState, (builder) => {
  builder.addCase(getCoverPaper.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getCoverPaperById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default coverPaperReducer;
