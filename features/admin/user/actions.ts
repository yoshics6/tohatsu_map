import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getUser = createAsyncThunk(
  "user/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(`${url}/users/get?keyword=${keyword}`);
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/users/lists`);
      console.log(response.data.data);
      return response.data.data;
    }
  }
);
export const getUserById = createAsyncThunk(
  "user/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/users/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);
export const addUser = createAsyncThunk("user/add", async (data: FormData) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_API;
  const response = await axios.put(`${url}/users/create`, data);
  console.log(response);
  return response;
});

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/users/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllUser = createAsyncThunk(
  "user/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/users/deleteall`, { user_id: id });
    return { status: "success" };
  }
);

export const editUser = createAsyncThunk(
  "user/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/users/edit`, data);
    return response;
  }
);

export const uploadUser = createAsyncThunk(
  "user/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/users/upload`, data);
    return response;
  }
);
