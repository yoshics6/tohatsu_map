import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getSalesSaddleStitch = createAsyncThunk(
  "sales_saddle_stitch/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/sales_saddle_stitch/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/sales_saddle_stitch/lists`);
      console.log(response.data);
      return response.data.data;
    }
  }
);
export const getSalesSaddleStitchById = createAsyncThunk(
  "sales_saddle_stitch/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(
        `${url}/sales_saddle_stitch/getbyid?id=${id}`
      );
      return response.data.data;
    }
  }
);
export const addSalesSaddleStitch = createAsyncThunk(
  "sales_saddle_stitch/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_saddle_stitch/add`, data);
    return response;
  }
);

export const deleteSalesSaddleStitch = createAsyncThunk(
  "sales_saddle_stitch/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_saddle_stitch/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllSalesSaddleStitch = createAsyncThunk(
  "sales_saddle_stitch/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_saddle_stitch/deleteall`, {
      sales_saddle_stitch_id: id,
    });
    return { status: "success" };
  }
);

export const editSalesSaddleStitch = createAsyncThunk(
  "sales_saddle_stitch/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_saddle_stitch/edit`, data);
    return response;
  }
);

export const uploadSalesSaddleStitch = createAsyncThunk(
  "sales_saddle_stitch/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(
      `${url}/sales_saddle_stitch/upload`,
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
