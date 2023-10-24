import { createReducer } from "@reduxjs/toolkit";
import {
  getPaperBag,
  getPaperBagById,
} from "@/features/admin/paper_bag/actions";
import { PaperBagState } from "@/models/paper_bag.model";

const initialState: PaperBagState = {
  data: {
    papb_type: "",
    papb_finished_size: "",
    papb_page: "",
    papb_paper: "",
    papb_printing: "",
    papb_coating: "",
    papb_binding: "",
    papb_100: 0,
    papb_200: 0,
    papb_300: 0,
    papb_400: 0,
    papb_500: 0,
  },
};

export const paperBagReducer = createReducer(initialState, (builder) => {
  builder.addCase(getPaperBag.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getPaperBagById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default paperBagReducer;
