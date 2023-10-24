import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getContactTohaReq = createAsyncThunk(
  "contact_toha_req/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(`${url}/contact_toha_req/get?keyword=${keyword}`);
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/contact_toha_req/lists`);
      console.log(response.data);
      return response.data.data;
    }
  }
);
export const getContactTohaReqById = createAsyncThunk(
  "contact_toha_req/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/contact_toha_req/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);
export const addContactTohaReq = createAsyncThunk(
  "contact_toha_req/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/contact_toha_req/add`, data);
    return response;
  }
);

export const deleteContactTohaReq = createAsyncThunk(
  "contact_toha_req/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/contact_toha_req/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllContactTohaReq = createAsyncThunk(
  "contact_toha_req/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/contact_toha_req/deleteall`, { contact_id: id });
    return { status: "success" };
  }
);

export const editContactTohaReq = createAsyncThunk(
  "contact_toha_req/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/contact_toha_req/edit`, data);
    return response;
  }
);

export const uploadContactTohaReq = createAsyncThunk(
  "contact_toha_req/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/contact_toha_req/upload`, data, {
      headers: {
        "access-token": `Bearer ${getCookie("access-token")}`,
      },
    });
    return response;
  }
);
