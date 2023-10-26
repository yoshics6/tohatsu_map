import { createReducer } from "@reduxjs/toolkit";
import { getNews, getNewsById } from "@/features/admin/news/actions";
import { newsState } from "@/models/news.model";

const initialState: newsState = {
  data: {
    news_id: 0,
    news_date: "",
    news_title: "",
    news_image: "",
    news_detail: "",
    news_status: "",
    news_created_at: ""
  },
};

export const newsReducer = createReducer(initialState, (builder) => {
  builder.addCase(getNews.fulfilled, (state, action) => {
    state.data = action.payload;
  });
  builder.addCase(getNewsById.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});

export default newsReducer;
