import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getSalesCuttingSheet = createAsyncThunk(
  "sales_cutting_sheet/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/sales_cutting_sheet/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/sales_cutting_sheet/lists`);
      console.log(response.data);
      return response.data.data;
    }
  }
);
export const getSalesCuttingSheetById = createAsyncThunk(
  "sales_cutting_sheet/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(
        `${url}/sales_cutting_sheet/getbyid?id=${id}`
      );
      return response.data.data;
    }
  }
);
export const addSalesCuttingSheet = createAsyncThunk(
  "sales_cutting_sheet/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_cutting_sheet/add`, data);
    return response;
  }
);

export const deleteSalesCuttingSheet = createAsyncThunk(
  "sales_cutting_sheet/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_cutting_sheet/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllSalesCuttingSheet = createAsyncThunk(
  "sales_cutting_sheet/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_cutting_sheet/deleteall`, {
      sales_cutting_sheet_id: id,
    });
    return { status: "success" };
  }
);

export const editSalesCuttingSheet = createAsyncThunk(
  "sales_cutting_sheet/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_cutting_sheet/edit`, data);
    return response;
  }
);

export const uploadSalesCuttingSheet = createAsyncThunk(
  "sales_cutting_sheet/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(
      `${url}/sales_cutting_sheet/upload`,
      data,
      {
        headers: {
          "access-token": `Bearer ${getCookie("access-token")}`,
        },
      }
    );
    return response;
  }
);
