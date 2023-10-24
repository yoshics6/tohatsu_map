import { createReducer } from "@reduxjs/toolkit";
import {
  getCuttingSheet,
  getCuttingSheetById,
  getCoverPaper,
  getCoverPaperEdit,
  getTextPaper,
  getTextNo,
  getPrinting,
} from "@/features/admin/cutting_sheet/actions";
import { CuttingSheetState } from "@/models/cutting_sheet.model";

const initialState: CuttingSheetState = {
  data: {
    cutt_type: "",
    cutt_finished_size: "",
    cutt_page: "",
    cutt_text_paper: "",
    cutt_printing: "",
    cutt_text_coating: "",
    cutt_500: 0,
    cutt_1000: 0,
    cutt_2000: 0,
    cutt_3000: 0,
    cutt_4000: 0,
    cutt_5000: 0,
  },
  data_text_paper: {
    cutt_type: "",
    cutt_finished_size: "",
    cutt_page: "",
    cutt_text_paper: "",
    cutt_printing: "",
    cutt_text_coating: "",
    cutt_500: 0,
    cutt_1000: 0,
    cutt_2000: 0,
    cutt_3000: 0,
    cutt_4000: 0,
    cutt_5000: 0,
  },
  data_text_no: {
    cutt_type: "",
    cutt_finished_size: "",
    cutt_page: "",
    cutt_text_paper: "",
    cutt_printing: "",
    cutt_text_coating: "",
    cutt_500: 0,
    cutt_1000: 0,
    cutt_2000: 0,
    cutt_3000: 0,
    cutt_4000: 0,
    cutt_5000: 0,
  },
  data_printing: {
    cutt_type: "",
    cutt_finished_size: "",
    cutt_page: "",
    cutt_text_paper: "",
    cutt_printing: "",
    cutt_text_coating: "",
    cutt_500: 0,
    cutt_1000: 0,
    cutt_2000: 0,
    cutt_3000: 0,
    cutt_4000: 0,
    cutt_5000: 0,
  },
  data_cover_paper_edit : {
    cutt_type: "",
    cutt_finished_size: "",
    cutt_page: "",
    cutt_text_paper: "",
    cutt_printing: "",
    cutt_text_coating: "",
    cutt_500: 0,
    cutt_1000: 0,
    cutt_2000: 0,
    cutt_3000: 0,
    cutt_4000: 0,
    cutt_5000: 0,
  },
};

export const cuttingSheetReducer = createReducer(initialState, (builder) => {
  builder.addCase(getCuttingSheet.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getCuttingSheetById.fulfilled, (state, action) => {
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

export default cuttingSheetReducer;
