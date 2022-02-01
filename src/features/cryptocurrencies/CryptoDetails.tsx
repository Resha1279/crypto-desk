import React, { FC, useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../../services/cryptoApi";
import {
  AiOutlineDollarCircle,
  AiOutlineThunderbolt,
  AiOutlineTrophy,
  AiOutlineFund,
  AiOutlineMoneyCollect,
  AiOutlineExclamationCircle,
  AiOutlineNumber,
  AiOutlineStop,
  AiOutlineCheck,
} from "react-icons/ai";
import { RouteMotion } from "../../common";
import styled from "styled-components";

import {
  PageContainer,
  Row,
  SectionContainer,
} from "../../style/common.styled";
import { motion } from "framer-motion";

import CryptoChart from "./CryptoChart";
import { CoinHistory } from "./type";

interface Props {}

interface Coin {
  "24hVolume": number;
  allTimeHigh: { price: number; timestamp: number };
  btcPrice: number;
  change: number;
  coinrankingUrl: string;
  color: string;
  description: string;
  iconUrl: string;
  links: { name: string; type: string; url: string }[];
  listedAt: number;
  lowVolume: boolean;
  marketCap: number;
  name: string;
  numberOfExchanges: number;
  numberOfMarkets: number;
  price: number;
  priceAt: number;
  rank: number;
  sparkline: string[];
  supply: { confirmed: boolean; total: number; circulating: number };
  symbol: string;
  tier: number;
  uuid: string;
  websiteUrl: string;
}

const CryptoDetails: FC = (props: Props) => {
  const { coinId } = useParams();

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  const cryptoDetails: Coin = data?.data?.coin;

  console.log("coin details", cryptoDetails);

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const [timePeriod, setTimePeriod] = useState(time[2]);

  const { data: coinData, isFetching: isFetchingHistory } =
    useGetCryptoHistoryQuery({
      coinId,
      timePeriod,
    });

  const coinHistory: CoinHistory = coinData?.data;

  console.log("coinHistory:", coinHistory);

  const stats = isFetching
    ? []
    : [
        {
          title: "Price to USD",
          value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
          icon: <AiOutlineDollarCircle />,
        },
        { title: "Rank", value: cryptoDetails.rank, icon: <AiOutlineNumber /> },
        {
          title: "24h Volume",
          value: `$ ${
            cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])
          }`,
          icon: <AiOutlineThunderbolt />,
        },
        {
          title: "Market Cap",
          value: `$ ${
            cryptoDetails.marketCap && millify(cryptoDetails.marketCap)
          }`,
          icon: <AiOutlineDollarCircle />,
        },
        {
          title: "All-time-high(daily avg.)",
          value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
          icon: <AiOutlineTrophy />,
        },
      ];

  const genericStats = isFetching
    ? []
    : [
        {
          title: "Number Of Markets",
          value: cryptoDetails.numberOfMarkets,
          icon: <AiOutlineFund />,
        },
        {
          title: "Number Of Exchanges",
          value: cryptoDetails.numberOfExchanges,
          icon: <AiOutlineMoneyCollect />,
        },
        {
          title: "Aprroved Supply",
          value: cryptoDetails.supply.confirmed ? (
            <AiOutlineCheck />
          ) : (
            <AiOutlineStop />
          ),
          icon: <AiOutlineExclamationCircle />,
        },
        {
          title: "Total Supply",
          value: cryptoDetails.supply.total
            ? `$ ${millify(cryptoDetails.supply.total)}`
            : "unavailable",
          icon: <AiOutlineExclamationCircle />,
        },
        {
          title: "Circulating Supply",
          value: `$ ${millify(cryptoDetails.supply.circulating)}`,
          icon: <AiOutlineExclamationCircle />,
        },
      ];

  if (isFetching || isFetchingHistory) {
    return <p>Loading..</p>;
  }

  return (
    <RouteMotion>
      <PageContainer>
        <Row spaceBetween align="end">
          <Title>
            <h1>{cryptoDetails.name} </h1>
            <p>
              {cryptoDetails.name} live price in Us Dollars. View value
              statistics, market cap and supply.
            </p>
          </Title>
          <Select
            defaultValue={timePeriod}
            onChange={(e) => {
              setTimePeriod(e.target.value);
            }}
          >
            {time.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </Select>
        </Row>

        <CryptoChart
          coinHistory={coinHistory}
          coinName={cryptoDetails.name}
          coinColor={cryptoDetails.color || "#0071bd"}
          currentPrice={millify(cryptoDetails.price)}
        />

        <SectionContainer>
          <Title>
            <h1>{cryptoDetails.name} value statistics</h1>
          </Title>

          <Row gap={20}>
            {stats.map(({ icon, title, value }) => (
              <Card key={title}>
                <Icon color={cryptoDetails.color}>
                  <h1>{icon}</h1>
                </Icon>
                <h3>{title}</h3>

                <h1>{value}</h1>
              </Card>
            ))}
            {genericStats.map(({ icon, title, value }) => (
              <Card key={title}>
                <Icon color={cryptoDetails.color}>
                  <h1>{icon}</h1>
                </Icon>
                <h3>{title}</h3>

                <h1>{value}</h1>
              </Card>
            ))}
          </Row>
        </SectionContainer>

        <SectionContainer>
          <Title>
            <h1>What is {cryptoDetails.name}?</h1>
          </Title>

          <DescriptionContainer>
            {HTMLReactParser(cryptoDetails.description)}
          </DescriptionContainer>
        </SectionContainer>

        <SectionContainer>
          <Title>
            <h1>{cryptoDetails.name} Links</h1>
          </Title>

          {cryptoDetails.links.map((link) => (
            <LinksContainer key={link.name} whileHover={{ translateX: 5 }}>
              <a href={link.url} target="_blank" rel="noreferrer">
                <div>
                  <h3>{link.type}</h3>
                  <h4>{link.name}</h4>
                </div>
              </a>
            </LinksContainer>
          ))}
        </SectionContainer>
      </PageContainer>
    </RouteMotion>
  );
};

export default CryptoDetails;

type CardProps = {
  color: string;
};

const Select = styled(motion.select)`
  width: 150px;
  padding: 1em;
  border-radius: 10px;
  background-color: var(--bg-secondary-dark);
  color: var(--text-secondary-white);
`;

const Card = styled.div`
  border: 1px solid var(--dull);
  padding: 1em 1em 1em 5.5em;
  width: 250px;
  border-radius: 0.5em;
  position: relative;

  h3 {
    font-size: small;
  }
`;

const Icon = styled.div<CardProps>`
  position: absolute;
  top: -10px;
  left: 10px;
  padding: 1em;
  background-color: ${({ color }) => color || "#0071bd"};
  border-radius: 4px;
  font-weight: 900;
`;

const Title = styled.div`
  margin-bottom: 2em;
`;

const DescriptionContainer = styled.div`
  h3 {
    font-size: var(--text-large);
    margin: 1em 0;
    font-weight: 600;
  }

  p {
    line-height: 1.8;
    text-align: justify;
  }
`;

const LinksContainer = styled(motion.div)`
  margin: 1em 0;
  max-width: 500px;
  border: 1px solid var(--dull);

  border-radius: 0.5em;
  &:hover {
    border-color: var(--white);
  }

  div {
    width: 100%;
    height: 100%;

    padding: 1em;
  }
`;
