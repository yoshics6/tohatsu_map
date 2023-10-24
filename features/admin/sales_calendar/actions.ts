import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getSalesCalendar = createAsyncThunk(
  "sales_calendar/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/sales_calendar/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/sales_calendar/lists`);
      console.log(response.data);
      return response.data.data;
    }
  }
);
export const getSalesCalendarById = createAsyncThunk(
  "sales_calendar/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(
        `${url}/sales_calendar/getbyid?id=${id}`
      );
      return response.data.data;
    }
  }
);
export const addSalesCalendar = createAsyncThunk(
  "sales_calendar/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_calendar/add`, data);
    return response;
  }
);

export const deleteSalesCalendar = createAsyncThunk(
  "sales_calendar/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_calendar/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllSalesCalendar = createAsyncThunk(
  "sales_calendar/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_calendar/deleteall`, {
      sales_calendar_id: id,
    });
    return { status: "success" };
  }
);

export const editSalesCalendar = createAsyncThunk(
  "sales_calendar/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_calendar/edit`, data);
    return response;
  }
);

export const uploadSalesCalendar = createAsyncThunk(
  "sales_calendar/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_calendar/upload`, data, {
      headers: {
        "access-token": `Bearer ${getCookie("access-token")}`,
      },
    });
    return response;
  }
);
