import { createReducer } from "@reduxjs/toolkit";
import {
  getFindDealer,
  addFindDealer,
  getFindDealerById,
} from "@/features/admin/find_dealer/actions";
import { FindDealerState } from "@/models/find_dealer.model";

const initialState: FindDealerState = {
  data: {
    fd_id: 0,
    fd_code: "",
    fd_dealer: "",
    fd_shop: "",
    fd_busines_type: "",
    fd_province: "",
    fd_address: "",
    fd_road: "",
    fd_subdistrict: "",
    fd_district: "",
    fd_zipcode: "",
    fd_tel: "",
    fd_latitude: "",
    fd_longitude: "",
    fd_created_at: "",
  },
};

export const FindDealerReducer = createReducer(initialState, (builder) => {
  builder.addCase(getFindDealer.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getFindDealerById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default FindDealerReducer;
