import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getSaddle = createAsyncThunk(
  "saddle_stitch/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/saddle_stitch/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/saddle_stitch/lists`);
      console.log(response.data.data);
      return response.data.data;
    }
  }
);

export const getSaddleById = createAsyncThunk(
  "saddle_stitch/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/saddle_stitch/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);

export const addSaddle = createAsyncThunk(
  "saddle_stitch/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.put(`${url}/saddle_stitch/create`, data);
    console.log(response);
    return response;
  }
);

export const deleteSaddle = createAsyncThunk(
  "saddle_stitch/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/saddle_stitch/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllSaddle = createAsyncThunk(
  "saddle_stitch/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/saddle_stitch/deleteall`, { sadd_id: id });
    return { status: "success" };
  }
);

export const editSaddle = createAsyncThunk(
  "saddle_stitch/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/saddle_stitch/edit`, data);
    return response;
  }
);

export const uploadSaddle = createAsyncThunk(
  "saddle_stitch/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/saddle_stitch/upload`, data);
    return response;
  }
);

// get cover paper
export const getCoverPaper = createAsyncThunk(
  "saddle_stitch/get_cover_paper",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/saddle_stitch/get_cover_paper`);
    // console.log(response.data.data);
    return response.data.data;
  }
);

// get text no
export const getTextNo = createAsyncThunk(
  "saddle_stitch/get_text_no",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/saddle_stitch/get_text_no`);
    // console.log(response.data.data);
    return response.data.data;
  }
);

// get text paper
export const getTextPaper = createAsyncThunk(
  "saddle_stitch/get_text_paper",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/saddle_stitch/get_text_paper`);
    // console.log(response.data.data);
    return response.data.data;
  }
);

// get printing
export const getPrinting = createAsyncThunk(
  "saddle_stitch/get_printing",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/saddle_stitch/get_printing`);
    // console.log(response.data.data);
    return response.data.data;
  }
  );

// get cover paper edit
export const getCoverPaperEdit = createAsyncThunk(
  "saddle_stitch/get_cover_paper_edit",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/saddle_stitch/get_cover_paper_edit`);
    // console.log(response.data.data);
    return response.data.data;
  }
);

