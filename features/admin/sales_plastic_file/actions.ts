import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getSalesPlasticFile = createAsyncThunk(
  "sales_plastic_file/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/sales_plastic_file/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/sales_plastic_file/lists`);
      console.log(response.data);
      return response.data.data;
    }
  }
);
export const getSalesPlasticFileById = createAsyncThunk(
  "sales_plastic_file/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(
        `${url}/sales_plastic_file/getbyid?id=${id}`
      );
      return response.data.data;
    }
  }
);
export const addSalesPlasticFile = createAsyncThunk(
  "sales_plastic_file/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_plastic_file/add`, data);
    return response;
  }
);

export const deleteSalesPlasticFile = createAsyncThunk(
  "sales_plastic_file/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_plastic_file/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllSalesPlasticFile = createAsyncThunk(
  "sales_plastic_file/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_plastic_file/deleteall`, {
      sales_plastic_file_id: id,
    });
    return { status: "success" };
  }
);

export const editSalesPlasticFile = createAsyncThunk(
  "sales_plastic_file/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_plastic_file/edit`, data);
    return response;
  }
);

export const uploadSalesPlasticFile = createAsyncThunk(
  "sales_plastic_file/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_plastic_file/upload`, data, {
      headers: {
        "access-token": `Bearer ${getCookie("access-token")}`,
      },
    });
    return response;
  }
);
