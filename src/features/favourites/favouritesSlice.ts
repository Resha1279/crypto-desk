import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<{ id: string }>) => {},
    removeFavourite: (state, action: PayloadAction<{ id: string }>) => {},
  },
});
