import React, { FC, useState } from "react";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import moment from "moment";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { Cryptos } from "../cryptocurrencies/type";
import styled from "styled-components";

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
      <CardContainer>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          cryptoNews?.value?.map((news: CryptoNews, index: number) => (
            <Card key={index}>
              <a href={news.url} target="_blank" rel="noreferrer">
                <TitleContainer>
                  <ContentImage
                    src={news.image?.thumbnail?.contentUrl || placeholderImage}
                    alt="news"
                  />
                  <h2>{news.name}</h2>
                </TitleContainer>
                <Description>{news.description}</Description>
                <SourceContainer>
                  <SourceImage
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      placeholderImage
                    }
                    alt="newssource"
                  />
                  <span>{news.provider[0].name}</span>
                  &nbsp;&#8226;&nbsp;
                  <span>{moment(news.datePublished).fromNow()}</span>
                </SourceContainer>
              </a>
            </Card>
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
`;

const Card = styled.div`
  border: 0.5px solid #fff;
  min-width: 400px;

  padding: 1em;
  min-height: 360px;
  flex: 1;
  transition: all 0.5s ease;

  &:hover {
    box-shadow: 0 0 2px var(--white), 0 0 10px var(--white);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 30px;
`;

const ContentImage = styled.img`
  width: 100px;
  height: 100px;
`;

const SourceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SourceImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--white);
  object-fit: cover;
  padding: 2px;
  margin-right: 1em;
`;

const Description = styled.div`
  text-align: justify;
  padding: 2em 0;
  color: var(--dull);
`;
