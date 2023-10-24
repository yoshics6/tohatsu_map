import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

// get reset password
export const getResetPasswordById = createAsyncThunk(
  "forgot_password/reset-password",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(
        `${url}/forgot_password/reset-password?token=${id}`
      );
      return response.data.data;
    }
  }
);

// get reset password confirm
export const getResetPasswordConfirm = createAsyncThunk(
  "forgot_password/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.put(`${url}/forgot_password/add`, data);
    // console.log(response);
    return response;
  }
);
