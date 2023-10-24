import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getSalesEnvelope = createAsyncThunk(
  "sales_envelope/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/sales_envelope/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/sales_envelope/lists`);
      console.log(response.data);
      return response.data.data;
    }
  }
);
export const getSalesEnvelopeById = createAsyncThunk(
  "sales_envelope/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(
        `${url}/sales_envelope/getbyid?id=${id}`
      );
      return response.data.data;
    }
  }
);
export const addSalesEnvelope = createAsyncThunk(
  "sales_envelope/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_envelope/add`, data);
    return response;
  }
);

export const deleteSalesEnvelope = createAsyncThunk(
  "sales_envelope/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_envelope/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllSalesEnvelope = createAsyncThunk(
  "sales_envelope/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_envelope/deleteall`, {
      sales_envelope_id: id,
    });
    return { status: "success" };
  }
);

export const editSalesEnvelope = createAsyncThunk(
  "sales_envelope/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_envelope/edit`, data);
    return response;
  }
);

export const uploadSalesEnvelope = createAsyncThunk(
  "sales_envelope/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_envelope/upload`, data, {
      headers: {
        "access-token": `Bearer ${getCookie("access-token")}`,
      },
    });
    return response;
  }
);
