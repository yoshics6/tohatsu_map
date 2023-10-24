import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getFolding = createAsyncThunk(
  "folding/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/folding/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/folding/lists`);
      console.log(response.data.data);
      return response.data.data;
    }
  }
);

export const getFoldingById = createAsyncThunk(
  "folding/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(`${url}/folding/getbyid?id=${id}`);
      return response.data.data;
    }
  }
);

export const addFolding = createAsyncThunk(
  "folding/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.put(`${url}/folding/create`, data);
    console.log(response);
    return response;
  }
);

export const deleteFolding = createAsyncThunk(
  "folding/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/folding/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllFolding = createAsyncThunk(
  "folding/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/folding/deleteall`, { fold_id: id });
    return { status: "success" };
  }
);

export const editFolding = createAsyncThunk(
  "folding/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/folding/edit`, data);
    return response;
  }
);

export const uploadFolding = createAsyncThunk(
  "folding/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/folding/upload`, data);
    return response;
  }
);

// get cover paper
export const getCoverPaper = createAsyncThunk(
  "folding/get_cover_paper",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/folding/get_cover_paper`);
    // console.log(response.data.data);
    return response.data.data;
  }
);

// get text no
export const getTextNo = createAsyncThunk(
  "folding/get_text_no",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/folding/get_text_no`);
    // console.log(response.data.data);
    return response.data.data;
  }
);

// get text paper
export const getTextPaper = createAsyncThunk(
  "folding/get_text_paper",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/folding/get_text_paper`);
    // console.log(response.data.data);
    return response.data.data;
  }
);

// get printing
export const getPrinting = createAsyncThunk(
  "folding/get_printing",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/folding/get_printing`);
    // console.log(response.data.data);
    return response.data.data;
  }
  );

// get cover paper edit
export const getCoverPaperEdit = createAsyncThunk(
  "folding/get_cover_paper_edit",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.get(`${url}/folding/get_cover_paper_edit`);
    // console.log(response.data.data);
    return response.data.data;
  }
);

