import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getOc = createAsyncThunk(
  "outboards_category/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(`${url}/outboards_category/get?keyword=${keyword}`);
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/outboards_category/lists`);
      console.log(response.data.data);
      return response.data.data;
    }
  }
);
export const getOcById = createAsyncThunk(
  "outboards_category/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/outboards_category/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);
export const addOc = createAsyncThunk(
  "outboards_category/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.put(`${url}/outboards_category/create`, data);
    console.log(response);
    return response;
  }
);

export const deleteOc = createAsyncThunk(
  "outboards_category/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/outboards_category/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllOc = createAsyncThunk(
  "outboards_category/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/outboards_category/deleteall`, { oc_id : id });
    return { status: "success" };
  }
);

export const editOc = createAsyncThunk(
  "outboards_category/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/outboards_category/edit`, data);
    return response;
  }
);

export const uploadOc = createAsyncThunk(
  "outboards_category/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/outboards_category/upload`, data);
    return response;
  }
);
