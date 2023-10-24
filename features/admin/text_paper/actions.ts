import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getTextPaper = createAsyncThunk(
  "text_paper/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/text_paper/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/text_paper/lists`);
      console.log(response.data.data);
      return response.data.data;
    }
  }
);
export const getTextPaperById = createAsyncThunk(
  "text_paper/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/text_paper/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);
export const addTextPaper = createAsyncThunk(
  "text_paper/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.put(`${url}/text_paper/create`, data);
    console.log(response);
    return response;
  }
);

export const deleteTextPaper = createAsyncThunk(
  "text_paper/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/text_paper/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllTextPaper = createAsyncThunk(
  "text_paper/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/text_paper/deleteall`, { text_id: id });
    return { status: "success" };
  }
);

export const editTextPaper = createAsyncThunk(
  "text_paper/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/text_paper/edit`, data);
    return response;
  }
);

export const uploadTextPaper = createAsyncThunk(
  "text_paper/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/text_paper/upload`, data);
    return response;
  }
);
