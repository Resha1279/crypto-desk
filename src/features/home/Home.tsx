import React, { FC } from "react";
import { PageContainer, RouteMotion, Row, Link1 } from "../../common";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { millify } from "millify";
import CryptoList from "../cryptocurrencies/CryptocurrenciesList";
import NewsList from "../news/NewsList";
import { NavLink } from "react-router-dom";
import { CryptoStatsContainer, Stats, SectionHeader } from "./Home.styled";

interface Props {}

interface GlobalStats {
  total: number;
  total24hVolume: number;
  totalCoins: number;
  totalExchanges: number;
  totalMarketCap: number;
  totalMarkets: number;
}

const Home: FC = (props: Props) => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats: GlobalStats = data?.data?.stats;
  console.log(data);

  if (isFetching) {
    return <>Loading...</>;
  }

  return (
    <RouteMotion>
      <PageContainer>
        <h1>Global Crypto Stats</h1>

        <CryptoStatsContainer>
          <div>
            <h3>Total Cryptocurrencies</h3>
            <Stats>{globalStats.total}</Stats>
          </div>
          <div>
            <h3>Total Exchanges</h3>
            <Stats>{millify(globalStats.totalExchanges)}</Stats>
          </div>
          <div>
            <h3>Total Market Cap</h3>
            <Stats>{millify(globalStats.totalMarketCap)}</Stats>
          </div>
          <div>
            <h3>Total 24h Volume</h3>
            <Stats>{millify(globalStats.total24hVolume)}</Stats>
          </div>
          <div>
            <h3>Total Markets</h3>
            <Stats>{millify(globalStats.totalMarkets)}</Stats>
          </div>
        </CryptoStatsContainer>

        <SectionHeader>
          <h1>Top Cryptocurrencies in the World</h1>
          <NavLink to="/cryptocurrencies">
            <button>
              <h5>Show more</h5>
            </button>
          </NavLink>
        </SectionHeader>

        <CryptoList simplified />
        <SectionHeader>
          <h1>Latest Crypto News </h1>
          <NavLink to="/news">
            <button>
              <h5>Show more</h5>
            </button>
          </NavLink>
        </SectionHeader>
        <NewsList simplified />
      </PageContainer>
    </RouteMotion>
  );
};

export default Home;
