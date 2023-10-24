import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getSalesPerfectBinding = createAsyncThunk(
  "sales_perfect_binding/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/sales_perfect_binding/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/sales_perfect_binding/lists`);
      console.log(response.data);
      return response.data.data;
    }
  }
);
export const getSalesPerfectBindingById = createAsyncThunk(
  "sales_perfect_binding/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(
        `${url}/sales_perfect_binding/getbyid?id=${id}`
      );
      return response.data.data;
    }
  }
);
export const addSalesPerfectBinding = createAsyncThunk(
  "sales_perfect_binding/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_perfect_binding/add`, data);
    return response;
  }
);

export const deleteSalesPerfectBinding = createAsyncThunk(
  "sales_perfect_binding/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_perfect_binding/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllSalesPerfectBinding = createAsyncThunk(
  "sales_perfect_binding/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_perfect_binding/deleteall`, {
      sales_perfect_binding_id: id,
    });
    return { status: "success" };
  }
);

export const editSalesPerfectBinding = createAsyncThunk(
  "sales_perfect_binding/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(
      `${url}/sales_perfect_binding/edit`,
      data
    );
    return response;
  }
);

export const uploadSalesPerfectBinding = createAsyncThunk(
  "sales_perfect_binding/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(
      `${url}/sales_perfect_binding/upload`,
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
