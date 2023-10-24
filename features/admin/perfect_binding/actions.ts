import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getPerfectBinding = createAsyncThunk(
  "perfect_binding/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/perfect_binding/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/perfect_binding/lists`);
      console.log(response.data.data);
      return response.data.data;
    }
  }
);

export const getPerfectBindingById = createAsyncThunk(
  "perfect_binding/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/perfect_binding/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);

export const addPerfectBinding = createAsyncThunk(
  "perfect_binding/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.put(`${url}/perfect_binding/create`, data);
    console.log(response);
    return response;
  }
);

export const deletePerfectBinding = createAsyncThunk(
  "perfect_binding/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/perfect_binding/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllPerfectBinding = createAsyncThunk(
  "perfect_binding/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/perfect_binding/deleteall`, { perf_id: id });
    return { status: "success" };
  }
);

export const editPerfectBinding = createAsyncThunk(
  "perfect_binding/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/perfect_binding/edit`, data);
    return response;
  }
);

export const uploadPerfectBinding = createAsyncThunk(
  "perfect_binding/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/perfect_binding/upload`, data);
    return response;
  }
);

// get cover paper
export const getCoverPaper = createAsyncThunk(
  "perfect_binding/get_cover_paper",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/perfect_binding/get_cover_paper`);
    // console.log(response.data.data);
    return response.data.data;
  }
);

// get text no
export const getTextNo = createAsyncThunk(
  "perfect_binding/get_text_no",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/perfect_binding/get_text_no`);
    // console.log(response.data.data);
    return response.data.data;
  }
);

// get text paper
export const getTextPaper = createAsyncThunk(
  "perfect_binding/get_text_paper",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/perfect_binding/get_text_paper`);
    // console.log(response.data.data);
    return response.data.data;
  }
);

// get printing
export const getPrinting = createAsyncThunk(
  "perfect_binding/get_printing",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/perfect_binding/get_printing`);
    // console.log(response.data.data);
    return response.data.data;
  }
  );

// get cover paper edit
export const getCoverPaperEdit = createAsyncThunk(
  "perfect_binding/get_cover_paper_edit",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/perfect_binding/get_cover_paper_edit`);
    // console.log(response.data.data);
    return response.data.data;
  }
);

