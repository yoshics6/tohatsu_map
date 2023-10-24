import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getCuttingSheet = createAsyncThunk(
  "cutting_sheet/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/cutting_sheet/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/cutting_sheet/lists`);
      console.log(response.data.data);
      return response.data.data;
    }
  }
);

export const getCuttingSheetById = createAsyncThunk(
  "cutting_sheet/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/cutting_sheet/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);

export const addCuttingSheet = createAsyncThunk(
  "cutting_sheet/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.put(`${url}/cutting_sheet/create`, data);
    console.log(response);
    return response;
  }
);

export const deleteCuttingSheet = createAsyncThunk(
  "cutting_sheet/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/cutting_sheet/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllCuttingSheet = createAsyncThunk(
  "cutting_sheet/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/cutting_sheet/deleteall`, { cutt_id: id });
    return { status: "success" };
  }
);

export const editCuttingSheet = createAsyncThunk(
  "cutting_sheet/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/cutting_sheet/edit`, data);
    return response;
  }
);

export const uploadCuttingSheet = createAsyncThunk(
  "cutting_sheet/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/cutting_sheet/upload`, data);
    return response;
  }
);

// get cover paper
export const getCoverPaper = createAsyncThunk(
  "cutting_sheet/get_cover_paper",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/cutting_sheet/get_cover_paper`);
    // console.log(response.data.data);
    return response.data.data;
  }
);

// get text no
export const getTextNo = createAsyncThunk(
  "cutting_sheet/get_text_no",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/cutting_sheet/get_text_no`);
    // console.log(response.data.data);
    return response.data.data;
  }
);

// get text paper
export const getTextPaper = createAsyncThunk(
  "cutting_sheet/get_text_paper",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/cutting_sheet/get_text_paper`);
    // console.log(response.data.data);
    return response.data.data;
  }
);

// get printing
export const getPrinting = createAsyncThunk(
  "cutting_sheet/get_printing",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/cutting_sheet/get_printing`);
    // console.log(response.data.data);
    return response.data.data;
  }
  );

// get cover paper edit
export const getCoverPaperEdit = createAsyncThunk(
  "cutting_sheet/get_cover_paper_edit",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/cutting_sheet/get_cover_paper_edit`);
    // console.log(response.data.data);
    return response.data.data;
  }
);

