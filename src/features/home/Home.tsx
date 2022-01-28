import React, { FC } from "react";
import { RouteMotion } from "../../common";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { millify } from "millify";
import CryptoList from "../cryptocurrencies/CryptocurrenciesList";
import NewsList from "../news/NewsList";
import { NavLink } from "react-router-dom";
import {
  CryptoStatsContainer,
  Stats,
  SectionHeader,
  StatsCard,
} from "./Home.styled";
import { PageContainer, SectionContainer } from "../../style/common.styled";

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
        <SectionContainer>
          <h1>Global Crypto Stats</h1>

          <CryptoStatsContainer>
            <StatsCard>
              <h3>Cryptocurrencies</h3>
              <Stats>{globalStats.total}</Stats>
            </StatsCard>
            <StatsCard>
              <h3>Exchanges</h3>
              <Stats>{millify(globalStats.totalExchanges)}</Stats>
            </StatsCard>
            <StatsCard>
              <h3>Market Cap</h3>
              <Stats>{millify(globalStats.totalMarketCap)}</Stats>
            </StatsCard>
            <StatsCard>
              <h3>24h Volume</h3>
              <Stats>{millify(globalStats.total24hVolume)}</Stats>
            </StatsCard>
            <StatsCard>
              <h3>Markets</h3>
              <Stats>{millify(globalStats.totalMarkets)}</Stats>
            </StatsCard>
          </CryptoStatsContainer>
        </SectionContainer>

        <SectionContainer>
          <SectionHeader>
            <h1>Top Cryptocurrencies in the World</h1>
            <NavLink to="/cryptocurrencies">
              <button>
                <h5>Show more</h5>
              </button>
            </NavLink>
          </SectionHeader>

          <CryptoList simplified />
        </SectionContainer>

        <SectionContainer>
          <SectionHeader>
            <h1>Latest Crypto News </h1>
            <NavLink to="/news">
              <button>
                <h5>Show more</h5>
              </button>
            </NavLink>
          </SectionHeader>
          <NewsList simplified />
        </SectionContainer>
      </PageContainer>
    </RouteMotion>
  );
};

export default Home;
