import React, { FC, useState } from "react";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { Cryptos } from "../cryptocurrencies/type";
import NewsCard from "./NewsCard";
import styled from "styled-components";
import { CryptoNews } from "./type";
import { Row } from "../../style/common.styled";

interface Props {
  simplified?: boolean;
}

const NewsList: FC<Props> = ({ simplified }) => {
  let count: number = simplified ? 6 : 50;

  const { data: cryptocurrency, isFetching: isFetchingCurrency } =
    useGetCryptosQuery(100);

  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });

  console.log("cryptoNews: ", cryptoNews);

  return (
    <div>
      {simplified || (
        <Row spaceBetween gap={50}>
          <div>
            <h1>Latest Crypto News</h1>
          </div>
          <SelectContainer>
            <Select
              onChange={(e) => {
                setNewsCategory(e.target.value);
              }}
            >
              <option value="Cryptocurrency">Cryptocurrency</option>
              {cryptocurrency?.data?.coins.map((coin: Cryptos) => (
                <option value={`${coin.name} (${coin.symbol}) coin`}>
                  {coin.name}
                </option>
              ))}
            </Select>
          </SelectContainer>
        </Row>
      )}
      <CardContainer>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          cryptoNews?.value?.map((news: CryptoNews, index: number) => (
            <NewsCard key={`crypto-news-${index}`} news={news} />
          ))
        )}
      </CardContainer>
    </div>
  );
};

export default NewsList;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  margin-top: 2em;
`;

const SelectContainer = styled.div`
  flex: 1;
`;

const Select = styled.select`
  max-width: 300px;
  min-width: 150px;
  padding: 1em;
  border-radius: 6px;
  background-color: var(--bg-secondary-dark);
  color: var(--text-secondary-white);
  float: right;
`;
