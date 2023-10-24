import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getFindDealer = createAsyncThunk(
  "find_dealer/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(`${url}/find_dealer/get?keyword=${keyword}`);
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/find_dealer/lists`);
      console.log(response.data.data);
      return response.data.data;
    }
  }
);
export const getFindDealerById = createAsyncThunk(
  "find_dealer/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/find_dealer/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);
export const addFindDealer = createAsyncThunk(
  "find_dealer/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.put(`${url}/find_dealer/create`, data);
    console.log(response);
    return response;
  }
);

export const deleteFindDealer = createAsyncThunk(
  "find_dealer/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/find_dealer/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllFindDealer = createAsyncThunk(
  "find_dealer/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/find_dealer/deleteall`, { fd_id: id });
    return { status: "success" };
  }
);

export const editFindDealer = createAsyncThunk(
  "find_dealer/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/find_dealer/edit`, data);
    return response;
  }
);

export const uploadFindDealer = createAsyncThunk(
  "find_dealer/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/find_dealer/upload`, data);
    return response;
  }
);
