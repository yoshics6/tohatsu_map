import { createReducer } from "@reduxjs/toolkit";
import {
  getSaddle,
  getSaddleById,
  getCoverPaper,
  getCoverPaperEdit,
  getTextPaper,
  getTextNo,
  getPrinting,
} from "@/features/admin/saddle_stitch/actions";
import { SaddleState } from "@/models/saddle.model";

const initialState: SaddleState = {
  data: {
    sadd_type: "",
    sadd_finished_size: "",
    sadd_cover: "",
    sadd_text: "",
    sadd_cover_paper: "",
    sadd_text_paper: "",
    sadd_printing: "",
    sadd_cover_coating: "",
    sadd_text_coating: "",
    sadd_500: 0,
    sadd_1000: 0,
    sadd_2000: 0,
    sadd_3000: 0,
    sadd_4000: 0,
    sadd_5000: 0,
  },
  data_text_paper: {
    sadd_type: "",
    sadd_finished_size: "",
    sadd_cover: "",
    sadd_text: "",
    sadd_cover_paper: "",
    sadd_text_paper: "",
    sadd_printing: "",
    sadd_cover_coating: "",
    sadd_text_coating: "",
    sadd_500: 0,
    sadd_1000: 0,
    sadd_2000: 0,
    sadd_3000: 0,
    sadd_4000: 0,
    sadd_5000: 0,
  },
  data_text_no: {
    sadd_type: "",
    sadd_finished_size: "",
    sadd_cover: "",
    sadd_text: "",
    sadd_cover_paper: "",
    sadd_text_paper: "",
    sadd_printing: "",
    sadd_cover_coating: "",
    sadd_text_coating: "",
    sadd_500: 0,
    sadd_1000: 0,
    sadd_2000: 0,
    sadd_3000: 0,
    sadd_4000: 0,
    sadd_5000: 0,
  },
  data_printing: {
    sadd_type: "",
    sadd_finished_size: "",
    sadd_cover: "",
    sadd_text: "",
    sadd_cover_paper: "",
    sadd_text_paper: "",
    sadd_printing: "",
    sadd_cover_coating: "",
    sadd_text_coating: "",
    sadd_500: 0,
    sadd_1000: 0,
    sadd_2000: 0,
    sadd_3000: 0,
    sadd_4000: 0,
    sadd_5000: 0,
  },
  data_cover_paper_edit : {
    sadd_type: "",
    sadd_finished_size: "",
    sadd_cover: "",
    sadd_text: "",
    sadd_cover_paper: "",
    sadd_text_paper: "",
    sadd_printing: "",
    sadd_cover_coating: "",
    sadd_text_coating: "",
    sadd_500: 0,
    sadd_1000: 0,
    sadd_2000: 0,
    sadd_3000: 0,
    sadd_4000: 0,
    sadd_5000: 0,
  },
};

export const saddleReducer = createReducer(initialState, (builder) => {
  builder.addCase(getSaddle.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getSaddleById.fulfilled, (state, action) => {
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

export default saddleReducer;
