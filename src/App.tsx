import React, { FC, Suspense, useEffect } from "react";
import GlobalStyles from "./style/GlobalStyle";
import { Routes, Route } from "react-router-dom";
import { Fallback, Layout, NotFoundPage, Page } from "./common";
import {
  Home,
  Cryptocurrencies,
  CryptoDetails,
  Exchanges,
  News,
  Favourites,
  Bookmarks,
  Feeds,
} from "./helpers/lazyRoutes";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import { getFavourite } from "./features/favourites/favouritesSlice";
import { useDispatch } from "react-redux";

const App: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedFavList = localStorage.getItem("favlist");
    console.log("storedFavList", storedFavList);
    if (storedFavList) {
      dispatch(getFavourite({ ids: JSON.parse(storedFavList) }));
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AnimatePresence exitBeforeEnter>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  <Page>
                    <Suspense fallback={<Fallback />}>
                      <Home />
                    </Suspense>
                  </Page>
                }
              />
              <Route
                path="/cryptocurrencies"
                element={
                  <Page>
                    <Suspense fallback={<Fallback />}>
                      <Cryptocurrencies />
                    </Suspense>
                  </Page>
                }
              />
              <Route
                path="/exchanges"
                element={
                  <Page>
                    <Suspense fallback={<Fallback />}>
                      <Exchanges />
                    </Suspense>
                  </Page>
                }
              />
              <Route
                path="/crypto/:coinId"
                element={
                  <Page>
                    <Suspense fallback={<Fallback />}>
                      <CryptoDetails />
                    </Suspense>
                  </Page>
                }
              />
              <Route
                path="/news"
                element={
                  <Page>
                    <Suspense fallback={<Fallback />}>
                      <News />
                    </Suspense>
                  </Page>
                }
              />
              <Route
                path="/favourites"
                element={
                  <Page>
                    <Suspense fallback={<Fallback />}>
                      <Favourites />
                    </Suspense>
                  </Page>
                }
              />
              <Route
                path="/bookmarks"
                element={
                  <Page>
                    <Suspense fallback={<Fallback />}>
                      <Bookmarks />
                    </Suspense>
                  </Page>
                }
              />
              <Route
                path="/feed"
                element={
                  <Page>
                    <Suspense fallback={<Fallback />}>
                      <Feeds />
                    </Suspense>
                  </Page>
                }
              />
              <Route
                path="*"
                element={
                  <Page>
                    <Suspense fallback={<Fallback />}>
                      <NotFoundPage />
                    </Suspense>
                  </Page>
                }
              />
            </Routes>
          </Layout>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
};

export default App;
