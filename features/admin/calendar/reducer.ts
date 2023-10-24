import { createReducer } from "@reduxjs/toolkit";
import {
  getCalendar,
  getCalendarById,
} from "@/features/admin/calendar/actions";
import { CalendarState } from "@/models/calendar.model";

const initialState: CalendarState = {
  data: {
    cale_type: "",
    cale_finished_size: "",
    cale_page: "",
    cale_paper: "",
    cale_printing: "",
    cale_stand: "",
    cale_binding: "",
    cale_o_ring_color: "",
    cale_100: 0,
    cale_200: 0,
    cale_300: 0,
    cale_400: 0,
    cale_500: 0,
  },
};

export const calendarReducer = createReducer(initialState, (builder) => {
  builder.addCase(getCalendar.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getCalendarById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default calendarReducer;
