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
    getFavourite: (state, action: PayloadAction<{ ids: string[] }>) => {
      const { ids } = action.payload;
      if (ids && ids?.length > 0) {
        console.log("ids", ids);
        state.value = ids;
      }
    },
    addFavourite: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      if (id && !state.value.includes(id)) {
        localStorage.clear();
        state.value.push(id);
        localStorage.setItem("favlist", JSON.stringify(state.value));
      }
    },
    removeFavourite: (state, action: PayloadAction<{ id: string }>) => {
      localStorage.clear();
      state.value = state.value.filter((item) => item !== action.payload.id);
      localStorage.setItem("favlist", JSON.stringify(state.value));
    },
  },
});

export const { getFavourite, addFavourite, removeFavourite } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
