import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import favouritesReducer from "../features/favourites/favouritesSlice";
import cryptocurrencyReducer from "../features/cryptocurrencies/cryptocurrenciesSlice";
import bookmarksReducer from "../features/bookmarks/bookmarksSlice";

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    //todo: remove below
    cryptocurrency: cryptocurrencyReducer,
    favourites: favouritesReducer,
    bookmarks: bookmarksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
