import { createReducer } from "@reduxjs/toolkit";
import {
  getEnvelope,
  getEnvelopeById,
} from "@/features/admin/envelope/actions";
import { EnvelopeState } from "@/models/envelope.model";

const initialState: EnvelopeState = {
  data: {
    enve_type: "",
    enve_finished_size: "",
    enve_page: "",
    enve_paper: "",
    enve_printing: "",
    enve_coating: "",
    enve_1000: 0,
    enve_2000: 0,
    enve_3000: 0,
    enve_4000: 0,
    enve_5000: 0,
  },
};

export const envelopeBagReducer = createReducer(initialState, (builder) => {
  builder.addCase(getEnvelope.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getEnvelopeById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default envelopeBagReducer;
