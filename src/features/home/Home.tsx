import React, { FC } from "react";
import {
  Column,
  Heading1,
  PageContainer,
  RouteMotion,
  Row,
  Subtitle,
  ColoredText,
  Link1,
} from "../../common";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { millify } from "millify";
import CryptoList from "../cryptocurrencies/CryptocurrenciesList";
import NewsList from "../news/NewsList";
import { NavLink } from "react-router-dom";

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
        <Heading1>Global Crypto Stats</Heading1>
        <Row>
          <Column width="400px">
            <ColoredText>Total Cryptocurrencies</ColoredText>
            <Subtitle>{globalStats.total}</Subtitle>
          </Column>
          <Column width="400px">
            <ColoredText>Total Exchanges</ColoredText>
            <Subtitle>{millify(globalStats.totalExchanges)}</Subtitle>
          </Column>
        </Row>
        <Row>
          <Column width="400px">
            <ColoredText>Total Market Cap</ColoredText>
            <Subtitle>{millify(globalStats.totalMarketCap)}</Subtitle>
          </Column>
          <Column width="400px">
            <ColoredText>Total 24h Volume</ColoredText>
            <Subtitle>{millify(globalStats.total24hVolume)}</Subtitle>
          </Column>
        </Row>
        <Row>
          <Column width="400px">
            <ColoredText>Total Markets</ColoredText>
            <Subtitle>{millify(globalStats.totalMarkets)}</Subtitle>
          </Column>
        </Row>

        <Row spaceBetween>
          <Heading1>Top 10 Cryptocurrencies in the World</Heading1>
          <NavLink to="/cryptocurrencies">
            <Link1>Show More</Link1>
          </NavLink>
        </Row>
        <CryptoList simplified />
        <Row spaceBetween>
          <Heading1>Latest Crypto News </Heading1>
          <NavLink to="/news">
            <Link1>Show More</Link1>
          </NavLink>
        </Row>
        <NewsList simplified />
      </PageContainer>
    </RouteMotion>
  );
};

export default Home;
