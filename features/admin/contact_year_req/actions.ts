import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getContactYearReq = createAsyncThunk(
  "contact_year_req/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(`${url}/contact_year_req/get?keyword=${keyword}`);
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/contact_year_req/lists`);
      console.log(response.data);
      return response.data.data;
    }
  }
);
export const getContactYearReqById = createAsyncThunk(
  "contact_year_req/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/contact_year_req/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);
export const addContactYearReq = createAsyncThunk(
  "contact_year_req/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/contact_year_req/add`, data);
    return response;
  }
);

export const deleteContactYearReq = createAsyncThunk(
  "contact_year_req/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/contact_year_req/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllContactYearReq = createAsyncThunk(
  "contact_year_req/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/contact_year_req/deleteall`, { contact_id: id });
    return { status: "success" };
  }
);

export const editContactYearReq = createAsyncThunk(
  "contact_year_req/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/contact_year_req/edit`, data);
    return response;
  }
);

export const uploadContactYearReq = createAsyncThunk(
  "contact_year_req/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/contact_year_req/upload`, data, {
      headers: {
        "access-token": `Bearer ${getCookie("access-token")}`,
      },
    });
    return response;
  }
);
