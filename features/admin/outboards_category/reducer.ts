import { createReducer } from "@reduxjs/toolkit";
import {
  getOc,
  addOc,
  getOcById,
} from "@/features/admin/outboards_category/actions";
import { OcState } from "@/models/outboards_category.model";

const initialState: OcState = {
  data: {
    oc_id: 0,
    oc_date: "",
    oc_category_name: "",
    oc_created_at: "",
  },
};

export const OcReducer = createReducer(initialState, (builder) => {
  builder.addCase(getOc.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getOcById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default OcReducer;
