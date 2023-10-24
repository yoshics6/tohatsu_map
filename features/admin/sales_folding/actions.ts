import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getSalesFolding = createAsyncThunk(
  "sales_folding/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/sales_folding/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/sales_folding/lists`);
      console.log(response.data);
      return response.data.data;
    }
  }
);
export const getSalesFoldingById = createAsyncThunk(
  "sales_folding/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/sales_folding/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);
export const addSalesFolding = createAsyncThunk(
  "sales_folding/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_folding/add`, data);
    return response;
  }
);

export const deleteSalesFolding = createAsyncThunk(
  "sales_folding/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_folding/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllSalesFolding = createAsyncThunk(
  "sales_folding/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_folding/deleteall`, {
      sales_folding_id: id,
    });
    return { status: "success" };
  }
);

export const editSalesFolding = createAsyncThunk(
  "sales_folding/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_folding/edit`, data);
    return response;
  }
);

export const uploadSalesFolding = createAsyncThunk(
  "sales_folding/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_folding/upload`, data, {
      headers: {
        "access-token": `Bearer ${getCookie("access-token")}`,
      },
    });
    return response;
  }
);
