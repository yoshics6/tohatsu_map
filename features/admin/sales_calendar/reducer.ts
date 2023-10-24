import { createReducer } from "@reduxjs/toolkit";
import {
  getSalesCalendar,
  getSalesCalendarById,
} from "@/features/admin/sales_calendar/actions";
import { SalesCalendarState } from "@/models/sales_calendar.model";

const initialState: SalesCalendarState = {
  data: {
    sals_cale_id: "",
    sals_cale_date: "",
    sals_cale_fullname: "",
    sals_cale_company_name: "",
    sals_cale_tel: "",
    sals_cale_email: "",
    sals_cale_doc_type: "",
    sals_cale_printing_type: "",
    sals_cale_amount: "",
    sals_cale_quotation_request: "",
    sals_cale_finished_size: "",
    sals_cale_page: "",
    sals_cale_paper: "",
    sals_cale_printing: "",
    sals_cale_stand: "",
    sals_cale_binding: "",
    slas_cale_o_ring_color: "",
    sals_cale_printing_volume: "",
  },
};

export const salesCalendarReducer = createReducer(initialState, (builder) => {
  builder.addCase(getSalesCalendar.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getSalesCalendarById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default salesCalendarReducer;
