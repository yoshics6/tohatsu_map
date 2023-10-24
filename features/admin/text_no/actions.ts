import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getTextNo = createAsyncThunk(
  "text_no/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(`${url}/text_no/get?keyword=${keyword}`);
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/text_no/lists`);
      console.log(response.data.data);
      return response.data.data;
    }
  }
);
export const getTextNoById = createAsyncThunk(
  "text_no/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/text_no/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);
export const addTextNo = createAsyncThunk(
  "text_no/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.put(`${url}/text_no/create`, data);
    console.log(response);
    return response;
  }
);

export const deleteTextNo = createAsyncThunk(
  "text_no/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/text_no/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllTextNo = createAsyncThunk(
  "text_no/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/text_no/deleteall`, { text_no_id: id });
    return { status: "success" };
  }
);

export const editTextNo = createAsyncThunk(
  "text_no/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/text_no/edit`, data);
    return response;
  }
);

export const uploadTextNo = createAsyncThunk(
  "text_no/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/text_no/upload`, data);
    return response;
  }
);
