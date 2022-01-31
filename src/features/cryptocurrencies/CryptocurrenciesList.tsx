import React, { FC, useEffect, useState } from "react";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import styled from "styled-components";
import { Row, SectionContainer } from "../../style/common.styled";
import { Cryptos } from "./type";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import {
  addFavourite,
  removeFavourite,
} from "../../features/favourites/favouritesSlice";
import { addCryptoList } from "./cryptocurrenciesSlice";
import CryptoCard from "./CryptoCard";

interface Props {
  simplified?: boolean;
}

const CryptoList: FC<Props> = ({ simplified }) => {
  const favList = useSelector((state: RootState) => state.favourites.value);
  const dispatch = useDispatch();

  const count: number = simplified ? 12 : 100;

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState<Cryptos[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isFetching && cryptosList) {
      const fetchedCryptos: Cryptos[] = cryptosList?.data?.coins;
      dispatch(addCryptoList(fetchedCryptos));
    }
  }, [cryptosList]);

  useEffect(() => {
    const filteredData: Cryptos[] = cryptosList?.data?.coins.filter(
      (coin: Cryptos) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  const handleFavToggle = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    uuid: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (favList.includes(uuid)) {
      dispatch(removeFavourite({ id: uuid }));
    } else {
      dispatch(addFavourite({ id: uuid }));
    }
  };

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
            cryptos?.map((crypto: Cryptos, index) => (
              <CryptoCard
                key={`crypto-card-${crypto.uuid}-${index}`}
                handleFavToggle={handleFavToggle}
                crypto={crypto}
                favlist={favList}
              />
            ))}
        </CardContainer>
      </SectionContainer>
    </div>
  );
};

export default CryptoList;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3em;
`;

const Input = styled.input`
  padding: 1em;
  border-radius: 8px;
  border: 1px solid var(--primary);
  width: 250px;
`;
