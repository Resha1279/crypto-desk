import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface favState {
  value: string[];
}

const initialState: favState = {
  value: [],
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    getFavourite: (state) => {
      const storedFavList = localStorage.getItem("favlist");
      if (storedFavList && storedFavList.length > 0) {
        state.value = JSON.parse(storedFavList);
      }
    },
    addFavourite: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      if (id && !state.value.includes(id)) {
        localStorage.removeItem("favlist");
        state.value.push(id);
        localStorage.setItem("favlist", JSON.stringify(state.value));
      }
    },
    removeFavourite: (state, action: PayloadAction<{ id: string }>) => {
      localStorage.removeItem("favlist");
      state.value = state.value.filter((item) => item !== action.payload.id);
      localStorage.setItem("favlist", JSON.stringify(state.value));
    },
  },
});

export const { getFavourite, addFavourite, removeFavourite } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
