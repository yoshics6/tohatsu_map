import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getPrinting = createAsyncThunk(
  "printing/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/printing/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/printing/lists`);
      console.log(response.data.data);
      return response.data.data;
    }
  }
);
export const getPrintingById = createAsyncThunk(
  "printing/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/printing/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);
export const addPrinting = createAsyncThunk(
  "printing/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.put(`${url}/printing/create`, data);
    console.log(response);
    return response;
  }
);

export const deletePrinting = createAsyncThunk(
  "printing/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/printing/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllPrinting = createAsyncThunk(
  "printing/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/printing/deleteall`, { printing_id: id });
    return { status: "success" };
  }
);

export const editPrinting = createAsyncThunk(
  "printing/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/printing/edit`, data);
    return response;
  }
);

export const uploadPrinting = createAsyncThunk(
  "printing/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/printing/upload`, data);
    return response;
  }
);
