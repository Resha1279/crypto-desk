import React, { FC, useEffect, useState } from "react";
import { RouteMotion } from "../../common";
import { PageContainer } from "../../style/common.styled";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Cryptos } from "../cryptocurrencies/type";
import CryptoCard from "../cryptocurrencies/CryptoCard";
import { addFavourite, removeFavourite } from "./favouritesSlice";
import styled from "styled-components";
import { useGetCryptosQuery } from "../../services/cryptoApi";

interface Props {}

const Favourites: FC = (props: Props) => {
  const { data: cryptoList, isFetching } = useGetCryptosQuery(100);

  const favListids = useSelector((state: RootState) => state.favourites.value);

  const [favourites, setFavourites] = useState<Cryptos[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFetching && cryptoList) {
      const fetchedCryptos: Cryptos[] = cryptoList?.data?.coins;
      const favList: Cryptos[] = fetchedCryptos.filter((crypto: Cryptos) =>
        favListids.includes(crypto.uuid)
      );
      setFavourites(favList);
    }
  }, [favListids, cryptoList]);

  const handleFavToggle = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    uuid: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (favListids.includes(uuid)) {
      dispatch(removeFavourite({ id: uuid }));
    } else {
      dispatch(addFavourite({ id: uuid }));
    }
  };

  if (isFetching) {
    return <p>Loading..</p>;
  }
  return (
    <RouteMotion>
      <PageContainer>
        <h1>Favourites</h1>
        <CardContainer>
          {favourites.map((item: Cryptos, index) => (
            <CryptoCard
              crypto={item}
              key={`crypto-card-${item.uuid}-${index}`}
              handleFavToggle={handleFavToggle}
              favlist={favListids}
            />
          ))}
        </CardContainer>
      </PageContainer>
    </RouteMotion>
  );
};

export default Favourites;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3em;
  margin-top: 3em;

  a {
    flex: 1 0 10%;
    min-width: 300px;
    max-width: 400px;
  }
`;
