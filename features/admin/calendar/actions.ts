import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getCalendar = createAsyncThunk(
  "calendar/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/calendar/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/calendar/lists`);
      console.log(response.data.data);
      return response.data.data;
    }
  }
);

export const getCalendarById = createAsyncThunk(
  "calendar/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/calendar/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);

export const addCalendar = createAsyncThunk(
  "calendar/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.put(`${url}/calendar/create`, data);
    console.log(response);
    return response;
  }
);

export const deleteCalendar = createAsyncThunk(
  "calendar/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/calendar/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllCalendar = createAsyncThunk(
  "calendar/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/calendar/deleteall`, { cale_id: id });
    return { status: "success" };
  }
);

export const editCalendar = createAsyncThunk(
  "calendar/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/calendar/edit`, data);
    return response;
  }
);

export const uploadCalendar = createAsyncThunk(
  "calendar/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/calendar/upload`, data);
    return response;
  }
);
