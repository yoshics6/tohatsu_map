import { createReducer } from "@reduxjs/toolkit";
import { getResetPasswordById } from "@/features/admin/forgot_password/actions";
import { ResetPasswordState } from "@/models/reset_password.model";

const initialState: ResetPasswordState = {
  data: {
    email: "",
    password: "",
    confirm_password: "",
  },
};

export const forgotPasswordReducer = createReducer(initialState, (builder) => {
  builder.addCase(getResetPasswordById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default forgotPasswordReducer;
