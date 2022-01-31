import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { RouteMotion } from "../../common";
import {
  useGetCryptoExchangesQuery,
  useGetCryptosQuery,
} from "../../services/cryptoApi";
import { PageContainer, Row } from "../../style/common.styled";
import { Cryptos } from "../cryptocurrencies/type";
import { motion } from "framer-motion";
import { millify } from "millify";

import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

interface Props {}

const Exchanges: FC = (props: Props) => {
  const [coinId, setCoinId] = useState<string>("Qwsogvtv82FCd");
  const [coinName, setCoinName] = useState<string>("Bitcoin (BTC)");
  const [coins, setCoins] = useState<Cryptos[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: coinsData, isFetching: isCoinFetching } =
    useGetCryptosQuery(100);

  const { data: exchangeData, isFetching: isExchangeFetching } =
    useGetCryptoExchangesQuery({ coinId });

  console.log("exchanges data:", exchangeData);
  console.log("exchanges data cryptos:", coinsData);

  useEffect(() => {
    const filteredData: Cryptos[] = coinsData?.data?.coins.filter(
      (coin: Cryptos) =>
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCoins(filteredData);
  }, [coinsData, searchTerm]);

  if (isCoinFetching || isExchangeFetching) {
    return <>Loading...</>;
  }
  return (
    <RouteMotion>
      <PageContainer>
        <h1>Exchanges</h1>

        <CategoriesContainer>
          <Input
            type="search"
            placeholder="Search.."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          {!isCoinFetching &&
            coins?.map((coin: Cryptos, index: number) => (
              <Symbols
                key={`exchange-category-${index}`}
                onClick={() => {
                  setCoinId(coin.uuid);
                  setCoinName(`${coin.name} (${coin.symbol})`);
                }}
              >
                {coin.symbol}
              </Symbols>
            ))}
        </CategoriesContainer>

        <ExchangesContainer>
          <h2>{coinName}</h2>
          {exchangeData?.data?.exchanges.map((exchange: any, index: number) => (
            <ExchangeCard key={`exchange-card-${index}`}>
              <a
                href={exchange.coinrankingUrl}
                target="_blank"
                rel="noreferrer"
              >
                <ExchangeIcon
                  whileHover={{ translateY: -5 }}
                  src={exchange.iconUrl}
                />
              </a>
              <h5>
                {exchange.rank}. {exchange.name}
              </h5>

              <Row gap={18} spaceBetween>
                <p>
                  Price:{" "}
                  <span>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(exchange.price)}
                  </span>
                </p>
                <p>
                  BTC Price:{" "}
                  <span>
                    {new Intl.NumberFormat("en-US", {
                      maximumSignificantDigits: 3,
                      style: "currency",
                      currency: "BTC",
                    }).format(exchange.btcPrice)}
                  </span>
                </p>
                <p>
                  24h Volume: <span>{millify(exchange["24hVolume"])}</span>
                </p>

                <p>
                  Markets: <span>{exchange.numberOfMarkets}</span>
                </p>

                <p>
                  Recommended:{" "}
                  <span>
                    {exchange.recommended ? (
                      <AiOutlineCheck color="yellow" />
                    ) : (
                      <AiOutlineClose color="red" />
                    )}
                  </span>
                </p>
                <p>
                  Verified:{" "}
                  <span>
                    {exchange.verified ? (
                      <AiOutlineCheck color="green" />
                    ) : (
                      <AiOutlineClose color="red" />
                    )}
                  </span>
                </p>
              </Row>
            </ExchangeCard>
          ))}
        </ExchangesContainer>
      </PageContainer>
    </RouteMotion>
  );
};

export default Exchanges;

const CategoriesContainer = styled.div`
  width: 300px;

  padding: 1em;

  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;

  @media (max-width: 900px) {
    position: relative;
    max-height: 214px;
    padding: 0;
    width: 100%;
    overflow: hidden;
  }
`;

const Input = styled.input`
  padding: 1em;
  border-radius: 8px;
  border: 1px solid var(--primary);
  width: 250px;
  margin: 1em 0;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Symbols = styled.h3`
  padding: 0.2em 0.5em;
  border: 1px solid var(--primary);
  border-radius: 16px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: var(--primary);
    color: var(--black);
  }
`;

const ExchangesContainer = styled.div`
  width: calc(100% - 250px);
  overflow: hidden;
  @media (max-width: 900px) {
    width: 100%;
  }

  h2 {
    margin: 1em 0;
    font-size: xx-large;
  }
`;

const ExchangeCard = styled.div`
  background-color: var(--bg-secondary-dark);
  margin: 2em 0;
  padding: 1em;
  border-radius: 4px;
  position: relative;

  h5 {
    margin-left: 120px;
    margin-bottom: 20px;
  }

  div {
    p {
      &:first-child {
        margin-left: 120px;
      }
    }
  }
`;

const ExchangeIcon = styled(motion.img)`
  width: 100px;
  height: 100px;
  padding: 0.4em;
  border-radius: 6px;
  background-color: var(--white);
  object-fit: contain;
  position: absolute;
  top: -10px;
`;
