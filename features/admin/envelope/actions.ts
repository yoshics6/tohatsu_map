import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getEnvelope = createAsyncThunk(
  "envelope/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/envelope/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/envelope/lists`);
      console.log(response.data.data);
      return response.data.data;
    }
  }
);

export const getEnvelopeById = createAsyncThunk(
  "envelope/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/envelope/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);

export const addEnvelope = createAsyncThunk(
  "envelope/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.put(`${url}/envelope/create`, data);
    console.log(response);
    return response;
  }
);

export const deleteEnvelope = createAsyncThunk(
  "envelope/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/envelope/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllEnvelope = createAsyncThunk(
  "envelope/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/envelope/deleteall`, { enve_id: id });
    return { status: "success" };
  }
);

export const editEnvelope = createAsyncThunk(
  "envelope/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/envelope/edit`, data);
    return response;
  }
);

export const uploadEnvelope = createAsyncThunk(
  "envelope/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/envelope/upload`, data);
    return response;
  }
);
