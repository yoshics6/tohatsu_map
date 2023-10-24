import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getCoverPaper = createAsyncThunk(
  "cover_paper/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/cover_paper/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/cover_paper/lists`);
      console.log(response.data.data);
      return response.data.data;
    }
  }
);
export const getCoverPaperById = createAsyncThunk(
  "cover_paper/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/cover_paper/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);
export const addCoverPaper = createAsyncThunk(
  "cover_paper/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.put(`${url}/cover_paper/create`, data);
    console.log(response);
    return response;
  }
);

export const deleteCoverPaper = createAsyncThunk(
  "cover_paper/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/cover_paper/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllCoverPaper = createAsyncThunk(
  "cover_paper/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/cover_paper/deleteall`, { cp_id: id });
    return { status: "success" };
  }
);

export const editCoverPaper = createAsyncThunk(
  "cover_paper/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/cover_paper/edit`, data);
    return response;
  }
);

export const uploadCoverPaper = createAsyncThunk(
  "cover_paper/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/cover_paper/upload`, data);
    return response;
  }
);
