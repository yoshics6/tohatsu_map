import { FabProps } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";

export const getSalesPaperBag = createAsyncThunk(
  "sales_paper_bag/get",
  async (keyword?: string): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (keyword) {
      const response = await axios.get(
        `${url}/sales_paper_bag/get?keyword=${keyword}`
      );
      return response.data.data;
    } else {
      const response = await axios.get(`${url}/sales_paper_bag/lists`);
      console.log(response.data);
      return response.data.data;
    }
  }
);
export const getSalesPaperBagById = createAsyncThunk(
  "sales_paper_bag/getbyid",
  async (id?: number): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    if (id) {
      const response = await axios.get(
        `${url}/sales_paper_bag/getbyid?id=${id}`
      );
      return response.data.data;
    }
  }
);
export const addSalesPaperBag = createAsyncThunk(
  "sales_paper_bag/add",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_paper_bag/add`, data);
    return response;
  }
);

export const deleteSalesPaperBag = createAsyncThunk(
  "sales_paper_bag/delete",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_paper_bag/delete`, data);
    return { status: "success" };
  }
);

export const deleteAllSalesPaperBag = createAsyncThunk(
  "sales_paper_bag/alldelete",
  async (id?: any) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    await axios.post(`${url}/sales_paper_bag/deleteall`, {
      sales_paper_bag_id: id,
    });
    return { status: "success" };
  }
);

export const editSalesPaperBag = createAsyncThunk(
  "sales_paper_bag/edit",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_paper_bag/edit`, data);
    return response;
  }
);

export const uploadSalesPaperBag = createAsyncThunk(
  "sales_paper_bag/upload",
  async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_API;
    const response = await axios.post(`${url}/sales_paper_bag/upload`, data, {
      headers: {
        "access-token": `Bearer ${getCookie("access-token")}`,
      },
    });
    return response;
  }
);
