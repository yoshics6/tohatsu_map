import { createReducer } from "@reduxjs/toolkit";
import {
  getPerfectBinding,
  getPerfectBindingById,
  getCoverPaper,
  getCoverPaperEdit,
  getTextPaper,
  getTextNo,
  getPrinting,
} from "@/features/admin/perfect_binding/actions";
import { PerfectBindingState } from "@/models/perfect.model";

const initialState: PerfectBindingState = {
  data: {
    perf_type: "",
    perf_finished_size: "",
    perf_cover: "",
    perf_text: "",
    perf_cover_paper: "",
    perf_text_paper: "",
    perf_printing: "",
    perf_cover_coating: "",
    perf_text_coating: "",
    perf_500: 0,
    perf_1000: 0,
    perf_2000: 0,
    perf_3000: 0,
    perf_4000: 0,
    perf_5000: 0,
  },
  data_text_paper: {
    perf_type: "",
    perf_finished_size: "",
    perf_cover: "",
    perf_text: "",
    perf_cover_paper: "",
    perf_text_paper: "",
    perf_printing: "",
    perf_cover_coating: "",
    perf_text_coating: "",
    perf_500: 0,
    perf_1000: 0,
    perf_2000: 0,
    perf_3000: 0,
    perf_4000: 0,
    perf_5000: 0,
  },
  data_text_no: {
    perf_type: "",
    perf_finished_size: "",
    perf_cover: "",
    perf_text: "",
    perf_cover_paper: "",
    perf_text_paper: "",
    perf_printing: "",
    perf_cover_coating: "",
    perf_text_coating: "",
    perf_500: 0,
    perf_1000: 0,
    perf_2000: 0,
    perf_3000: 0,
    perf_4000: 0,
    perf_5000: 0,
  },
  data_printing: {
    perf_type: "",
    perf_finished_size: "",
    perf_cover: "",
    perf_text: "",
    perf_cover_paper: "",
    perf_text_paper: "",
    perf_printing: "",
    perf_cover_coating: "",
    perf_text_coating: "",
    perf_500: 0,
    perf_1000: 0,
    perf_2000: 0,
    perf_3000: 0,
    perf_4000: 0,
    perf_5000: 0,
  },
  data_cover_paper_edit : {
    perf_type: "",
    perf_finished_size: "",
    perf_cover: "",
    perf_text: "",
    perf_cover_paper: "",
    perf_text_paper: "",
    perf_printing: "",
    perf_cover_coating: "",
    perf_text_coating: "",
    perf_500: 0,
    perf_1000: 0,
    perf_2000: 0,
    perf_3000: 0,
    perf_4000: 0,
    perf_5000: 0,
  },
};

export const perfectBindingReducer = createReducer(initialState, (builder) => {
  builder.addCase(getPerfectBinding.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getPerfectBindingById.fulfilled, (state, action) => {
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

export default perfectBindingReducer;
