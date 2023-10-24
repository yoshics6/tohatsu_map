import { createReducer } from "@reduxjs/toolkit";
import { getRegister } from "@/features/admin/signup/actions";
import { RegisterState } from "@/models/signup.model";

const initialState: RegisterState = {
  data: {
    fullname: "",
    email: "",
    tel: "",
    password: "",
    confirm_password: "",
  },
};

export const registerReducer = createReducer(initialState, (builder) => {
  builder.addCase(getRegister.fulfilled, (state, action) => {
    // state.data = action.payload;
  });
});

export default registerReducer;
