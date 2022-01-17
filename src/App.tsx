import React from "react";
import GlobalStyles from "./style/GlobalStyle";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./common";
import {
  Home,
  Cryptocurrencies,
  CryptoDetails,
  Exchanges,
  News,
  Favourites,
  Bookmarks,
  Feeds,
} from "./features";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/crypto/:coinId" element={<CryptoDetails />} />
        <Route path="/news" element={<News />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/feed" element={<Feeds />} />
      </Routes>
    </>
  );
};

export default App;
