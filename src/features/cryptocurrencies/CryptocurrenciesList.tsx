import React, { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CardContainer, Divider, Heading3, Row } from "../../common";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { millify } from "millify";

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
  const count: number = simplified ? 10 : 100;

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState<Cryptos[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData: Cryptos[] = cryptosList?.data?.coins.filter(
      (coin: Cryptos) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) {
    return <p>Loading..</p>;
  }
  return (
    <div>
      {simplified || (
        <div>
          <input
            type="search"
            placeholder="search.."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      )}
      <div>
        <Row gap={20}>
          {!isFetching &&
            cryptos?.map((crypto: Cryptos) => (
              <NavLink key={crypto.uuid} to={`/crypto/${crypto.uuid}`}>
                <CardContainer>
                  <Row spaceBetween>
                    <Heading3>
                      {crypto.rank}.&nbsp;&nbsp;{crypto.name}
                    </Heading3>
                    <img src={crypto.iconUrl} alt="icon" />
                  </Row>
                  <Divider />
                  <p>Price: $ {millify(crypto.price)}</p>
                  <p>BTC: {millify(crypto.btcPrice)} BTC</p>
                  <p>Market Cap: {millify(crypto.marketCap)}</p>
                  <p>Daily Change: {millify(crypto.change)}%</p>
                </CardContainer>
              </NavLink>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default CryptoList;
