import { createReducer } from "@reduxjs/toolkit";
import {
  getPlasticFile,
  getPlasticFileById,
} from "@/features/admin/plastic_file/actions";
import { PlasticFileState } from "@/models/plastic_file.model";

const initialState: PlasticFileState = {
  data: {
    plas_type: "",
    plas_finished_size: "",
    plas_page: "",
    plas_paper: "",
    plas_printing: "",
    // plas_coating: "",
    plas_binding: "",
    plas_1000: 0,
    plas_2000: 0,
    plas_3000: 0,
    plas_4000: 0,
    plas_5000: 0,
  },
};

export const plasticFileBagReducer = createReducer(initialState, (builder) => {
  builder.addCase(getPlasticFile.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getPlasticFileById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default plasticFileBagReducer;
