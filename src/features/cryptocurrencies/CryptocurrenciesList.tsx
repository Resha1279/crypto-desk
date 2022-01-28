import React, { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { millify } from "millify";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import { Row, SectionContainer } from "../../style/common.styled";

interface Props {
  simplified?: boolean;
}

export interface Cryptos {
  "24hVolume": string;
  btcPrice: number;
  change: number;
  coinrankingUrl: string;
  color: string;
  iconUrl: string;
  listedAt: number;
  lowVolume: boolean;
  marketCap: number;
  name: string;
  price: number;
  rank: number;
  sparkline: string[];
  symbol: string;
  tier: number;
  uuid: string;
}

const CryptoList: FC<Props> = ({ simplified }) => {
  const count: number = simplified ? 12 : 100;

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState<Cryptos[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [favList, setFavList] = useState<string[]>([]);

  useEffect(() => {
    const filteredData: Cryptos[] = cryptosList?.data?.coins.filter(
      (coin: Cryptos) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  useEffect(() => {
    console.log("fav::", favList);
  }, [favList]);

  if (isFetching) {
    return <p>Loading..</p>;
  }
  return (
    <div>
      {simplified || (
        <SectionContainer>
          <Row justify="end">
            <Input
              type="search"
              placeholder="Search.."
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </Row>
        </SectionContainer>
      )}

      <SectionContainer>
        <CardContainer>
          {!isFetching &&
            cryptos?.map((crypto: Cryptos) => (
              <NavLink key={crypto.uuid} to={`/crypto/${crypto.uuid}`}>
                <Card color={crypto.color === null ? "blue" : crypto.color}>
                  <h5>
                    {crypto.name} ({crypto.symbol})
                  </h5>
                  <CoinLogo src={crypto.iconUrl} alt="icon" />

                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (favList.includes(crypto.uuid)) {
                      } else {
                        setFavList([...favList, crypto.uuid]);
                      }
                    }}
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.6 }}
                  >
                    {favList.includes(crypto.uuid) ? (
                      <AiFillHeart color="red" />
                    ) : (
                      <HeartOutlined />
                    )}
                  </IconButton>
                  <CardContent>
                    <p>Price: &#36;{millify(crypto.price)}</p>
                    <p>BTC: {millify(crypto.btcPrice)} BTC</p>
                    <p>Market Cap: {millify(crypto.marketCap)}</p>
                    <p>Daily Change: {millify(crypto.change)}%</p>
                    <Rank>#{crypto.rank}</Rank>
                  </CardContent>
                </Card>
              </NavLink>
            ))}
        </CardContainer>
      </SectionContainer>
    </div>
  );
};

export default CryptoList;

type CardProps = {
  color: string;
};

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3em;

  a {
    flex: 1 0 10%; /* explanation below */
    min-width: 300px;
    max-width: 400px;
  }
`;

const Card = styled.div<CardProps>`
  background-color: var(--bg-secondary-dark);
  padding: 1.5em;
  border: 1px solid;
  border-color: ${({ color }) => color};
  border-radius: 6px;
  cursor: pointer;
  transition: 0.5s ease;
  position: relative;

  &:hover {
    color: #fff;
    box-shadow: ${({ color }) => `0 0 2px #fff, 0 0 10px #fff, 0 0 20px ${color}
      `};
  }

  h5 {
    max-width: 200px;
  }
`;

const CoinLogo = styled.img`
  width: 3em;
  height: 3em;
  border-radius: 50%;
  position: absolute;
  top: -25px;
  right: 14px;
  background-color: var(--white);
  padding: 8px;
`;

const IconButton = styled(motion.div)`
  font-size: 28px;
  position: absolute;
  right: 24px;
  top: 30px;
  padding: 2px;
  width: 30px;
  height: 30px;
  overflow: hidden;
`;

const CardContent = styled.div`
  padding: 20px;
  opacity: 0.6;
`;

const Rank = styled.p`
  position: absolute;
  color: var(--text-secondary-white);
  right: 10px;
  bottom: 0px;
  font-size: 60px;
  opacity: 0.5;
`;

const HeartOutlined = styled(AiOutlineHeart)`
  color: var(--text-secondary-white);
  opacity: 0.5;
`;

const Input = styled.input`
  padding: 1em;
  border-radius: 8px;
  border: 1px solid var(--primary);
  width: 250px;
`;
