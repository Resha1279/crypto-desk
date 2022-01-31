import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CryptoNews } from "../news/type";

interface BookmarksState {
  value: CryptoNews[];
}

const initialState: BookmarksState = {
  value: [],
};

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    getBookmarks: (state) => {
      const storedNewsList = localStorage.getItem("newslist");
      if (storedNewsList && storedNewsList.length > 0) {
        state.value = JSON.parse(storedNewsList);
      }
    },
    addBookmark: (state, action: PayloadAction<{ news: CryptoNews }>) => {
      const { news } = action.payload;

      localStorage.clear();
      state.value.push(news);
      localStorage.setItem("newslist", JSON.stringify(state.value));
    },
    removeBookmark: (state, action: PayloadAction<{ url: string }>) => {
      localStorage.clear();
      state.value = state.value.filter(
        (item) => item.url !== action.payload.url
      );
      localStorage.setItem("newslist", JSON.stringify(state.value));
    },
  },
});

export const { getBookmarks, addBookmark, removeBookmark } =
  bookmarksSlice.actions;

export default bookmarksSlice.reducer;
