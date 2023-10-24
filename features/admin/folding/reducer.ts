import { createReducer } from "@reduxjs/toolkit";
import {
  getFolding,
  getFoldingById,
  getCoverPaper,
  getCoverPaperEdit,
  getTextPaper,
  getTextNo,
  getPrinting,
} from "@/features/admin/folding/actions";
import { FoldingState } from "@/models/folding.model";

const initialState: FoldingState = {
  data: {
    fold_type: "",
    fold_finished_size: "",
    fold_open_size: "",
    fold_column: "",
    fold_page: "",
    fold_text_paper: "",
    fold_printing: "",
    fold_text_coating: "",
    fold_500: 0,
    fold_1000: 0,
    fold_2000: 0,
    fold_3000: 0,
    fold_4000: 0,
    fold_5000: 0,
  },
  data_text_paper: {
    fold_type: "",
    fold_finished_size: "",
    fold_open_size: "",
    fold_column: "",
    fold_page: "",
    fold_text_paper: "",
    fold_printing: "",
    fold_text_coating: "",
    fold_500: 0,
    fold_1000: 0,
    fold_2000: 0,
    fold_3000: 0,
    fold_4000: 0,
    fold_5000: 0,
  },
  data_text_no: {
    fold_type: "",
    fold_finished_size: "",
    fold_open_size: "",
    fold_column: "",
    fold_page: "",
    fold_text_paper: "",
    fold_printing: "",
    fold_text_coating: "",
    fold_500: 0,
    fold_1000: 0,
    fold_2000: 0,
    fold_3000: 0,
    fold_4000: 0,
    fold_5000: 0,
  },
  data_printing: {
    fold_type: "",
    fold_finished_size: "",
    fold_open_size: "",
    fold_column: "",
    fold_page: "",
    fold_text_paper: "",
    fold_printing: "",
    fold_text_coating: "",
    fold_500: 0,
    fold_1000: 0,
    fold_2000: 0,
    fold_3000: 0,
    fold_4000: 0,
    fold_5000: 0,
  },
  data_cover_paper_edit : {
    fold_type: "",
    fold_finished_size: "",
    fold_open_size: "",
    fold_column: "",
    fold_page: "",
    fold_text_paper: "",
    fold_printing: "",
    fold_text_coating: "",
    fold_500: 0,
    fold_1000: 0,
    fold_2000: 0,
    fold_3000: 0,
    fold_4000: 0,
    fold_5000: 0,
  },
};

export const foldingReducer = createReducer(initialState, (builder) => {
  builder.addCase(getFolding.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getFoldingById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getCoverPaper.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getTextNo.fulfilled, (state, action) => {
    state.data_text_no = action.payload;
  });
  builder.addCase(getTextPaper.fulfilled, (state, action) => {
    state.data_text_paper = action.payload;
  });
  builder.addCase(getPrinting.fulfilled, (state, actiion) => {
    state.data_printing = actiion.payload;
  });
  builder.addCase(getCoverPaperEdit.fulfilled, (state, actiion) => {
    state.data_cover_paper_edit = actiion.payload;
  });
});

export default foldingReducer;
