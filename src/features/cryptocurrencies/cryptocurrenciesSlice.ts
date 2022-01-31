import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cryptos } from "./type";

interface CryptoState {
  value: Cryptos[];
}

const initialState: CryptoState = {
  value: [],
};

export const cryptocurrencySlice = createSlice({
  name: "cryptocurrency",
  initialState,
  reducers: {
    addCryptoList: (state, action: PayloadAction<Cryptos[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addCryptoList } = cryptocurrencySlice.actions;

export default cryptocurrencySlice.reducer;
