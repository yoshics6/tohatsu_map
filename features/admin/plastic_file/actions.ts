import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getPlasticFile = createAsyncThunk(
  "plastic_file/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/plastic_file/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/plastic_file/lists`);
      console.log(response.data.data);
      return response.data.data;
    }
  }
);

export const getPlasticFileById = createAsyncThunk(
  "plastic_file/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/plastic_file/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);

export const addPlasticFile = createAsyncThunk(
  "plastic_file/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.put(`${url}/plastic_file/create`, data);
    console.log(response);
    return response;
  }
);

export const deletePlasticFile = createAsyncThunk(
  "plastic_file/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/plastic_file/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllPlasticFile = createAsyncThunk(
  "plastic_file/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/plastic_file/deleteall`, { plas_id: id });
    return { status: "success" };
  }
);

export const editPlasticFile = createAsyncThunk(
  "plastic_file/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/plastic_file/edit`, data);
    return response;
  }
);

export const uploadPlasticFile = createAsyncThunk(
  "plastic_file/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/plastic_file/upload`, data);
    return response;
  }
);
