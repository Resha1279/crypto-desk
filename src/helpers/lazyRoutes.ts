import { lazy } from "react";

export const Home = lazy(() => import("../features/home/Home"));
export const Cryptocurrencies = lazy(
  () => import("../features/cryptocurrencies/Cryptocurrencies")
);
export const CryptoDetails = lazy(
  () => import("../features/cryptocurrencies/CryptoDetails")
);
export const Exchanges = lazy(() => import("../features/exchanges/Exchanges"));
export const News = lazy(() => import("../features/news/News"));
export const Favourites = lazy(
  () => import("../features/favourites/Favourites")
);
export const Bookmarks = lazy(() => import("../features/bookmarks/Bookmarks"));
export const Feeds = lazy(() => import("../features/feeds/Feeds"));
