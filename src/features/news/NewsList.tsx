import React, { FC, useState } from "react";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import { Caption, CardContainer, Heading2, Row } from "../../common";
import moment from "moment";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { Cryptos } from "../cryptocurrencies/CryptocurrenciesList";

interface Props {
  simplified?: boolean;
}

interface CryptoNews {
  about: {
    name: string;
    readLink: string;
    _type: string;
  }[];
  datePublished: string;
  description: string;
  image: {
    thumbnail: {
      contentUrl: string;
      height: number;
      width: number;
    };
    _type: string;
  };
  mentions: {
    name: string;
    _type: string;
  }[];
  name: string;
  provider: {
    image: {
      _type: string;
      thumbnail: {
        contentUrl: string;
        _type: string;
      };
    };
    name: string;
    _type: string;
  }[];
  url: string;
  _type: string;
}

const placeholderImage: string =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDY2MYpu6UCHltaBhcYxzdmtLHUImp4c8dPg&usqp=CAU";

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
      <Row gap={20}>
        {simplified || (
          <div>
            <select
              onChange={(e) => {
                setNewsCategory(e.target.value);
              }}
            >
              <option value="Cryptocurrency">Cryptocurrency</option>
              {cryptocurrency?.data?.coins.map((coin: Cryptos) => (
                <option value={coin.name}>{coin.name}</option>
              ))}
              s
            </select>
          </div>
        )}
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          cryptoNews?.value?.map((news: CryptoNews, index: number) => (
            <a key={index} href={news.url} target="_blank" rel="noreferrer">
              <CardContainer>
                <img
                  src={news.image?.thumbnail?.contentUrl || placeholderImage}
                  alt="news"
                />
                <Heading2>{news.name}</Heading2>
                <Caption>{news.description}</Caption>
                <Row>
                  <img
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      placeholderImage
                    }
                    alt="newssource"
                  />
                  <Caption>{moment(news.datePublished).fromNow()}</Caption>
                </Row>
              </CardContainer>
            </a>
          ))
        )}
      </Row>
    </div>
  );
};

export default NewsList;
