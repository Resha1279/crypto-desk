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
import {
  ColoredText,
  Divider,
  Heading1,
  Heading2,
  Heading3,
  PageContainer,
  RouteMotion,
  Row,
} from "../../common";
import { is } from "immer/dist/internal";
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
        <Heading1>{cryptoDetails.name} </Heading1>
        <p>
          {cryptoDetails.name} live price in Us Dollars. View value statistics,
          market cap and supply.
        </p>
        <select
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
        </select>

        <CryptoChart
          coinHistory={coinHistory}
          coinName={cryptoDetails.name}
          currentPrice={millify(cryptoDetails.price)}
        />
        <Heading2>{cryptoDetails.name} value statistics</Heading2>
        <p>An overview showing stats of {cryptoDetails.name}</p>
        {stats.map(({ icon, title, value }) => (
          <div key={title}>
            <Row spaceBetween width={600}>
              <Row gap={10} width={300}>
                <ColoredText>{icon}</ColoredText>
                <Heading3>{title}</Heading3>
              </Row>
              <ColoredText>{value}</ColoredText>
            </Row>
            <Divider />
          </div>
        ))}
        <Heading2>Other Statistics</Heading2>

        {genericStats.map(({ icon, title, value }) => (
          <div key={title}>
            <Row spaceBetween width={600}>
              <Row gap={10} width={300}>
                <ColoredText>{icon}</ColoredText>
                <Heading3>{title}</Heading3>
              </Row>
              <ColoredText>{value}</ColoredText>
            </Row>
            <Divider />
          </div>
        ))}

        <Heading1>What is {cryptoDetails.name}?</Heading1>

        {HTMLReactParser(cryptoDetails.description)}

        <Heading1>{cryptoDetails.name} Links</Heading1>

        {cryptoDetails.links.map((link) => (
          <div key={link.name}>
            <ColoredText>{link.type}</ColoredText>
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.name}
            </a>
          </div>
        ))}
      </PageContainer>
    </RouteMotion>
  );
};

export default CryptoDetails;
