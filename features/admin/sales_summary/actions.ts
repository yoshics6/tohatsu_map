import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getSalesSummary = createAsyncThunk(
  "sales_summary/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/sales_summary/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/sales_summary/lists`);
      console.log(response.data);
      return response.data.data;
    }
  }
);
export const getSalesSummaryById = createAsyncThunk(
  "sales_summary/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/sales_summary/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);
export const addSalesSummary = createAsyncThunk(
  "sales_summary/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_summary/add`, data);
    return response;
  }
);

export const deleteSalesSummary = createAsyncThunk(
  "sales_summary/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_summary/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllSalesSummary = createAsyncThunk(
  "sales_summary/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_summary/deleteall`, {
      sales_summary_id: id,
    });
    return { status: "success" };
  }
);

export const editSalesSummary = createAsyncThunk(
  "sales_summary/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_summary/edit`, data);
    return response;
  }
);

export const uploadSalesSummary = createAsyncThunk(
  "sales_summary/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_summary/upload`, data, {
      headers: {
        "access-token": `Bearer ${getCookie("access-token")}`,
      },
    });
    return response;
  }
);

export const UpdateSendSalesSummary = createAsyncThunk(
  "sales_summary/update_send",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_summary/update_send`, data);
    return { status: "success" };
  }
);