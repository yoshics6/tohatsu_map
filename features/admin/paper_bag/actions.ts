import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getPaperBag = createAsyncThunk(
  "paper_bag/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/paper_bag/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/paper_bag/lists`);
      console.log(response.data.data);
      return response.data.data;
    }
  }
);

export const getPaperBagById = createAsyncThunk(
  "paper_bag/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/paper_bag/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);

export const addPaperBag = createAsyncThunk(
  "paper_bag/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.put(`${url}/paper_bag/create`, data);
    console.log(response);
    return response;
  }
);

export const deletePaperBag = createAsyncThunk(
  "paper_bag/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/paper_bag/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllPaperBag = createAsyncThunk(
  "paper_bag/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/paper_bag/deleteall`, { papb_id: id });
    return { status: "success" };
  }
);

export const editPaperBag = createAsyncThunk(
  "paper_bag/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/paper_bag/edit`, data);
    return response;
  }
);

export const uploadPaperBag = createAsyncThunk(
  "paper_bag/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/paper_bag/upload`, data);
    return response;
  }
);
