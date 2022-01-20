import React, { FC } from "react";

import { PageContainer, RouteMotion } from "../../common";
import CryptoList from "./CryptocurrenciesList";

interface Props {}

const Cryptocurrencies: FC = (props: Props) => {
  return (
    <RouteMotion>
      <PageContainer>
        <CryptoList />
      </PageContainer>
    </RouteMotion>
  );
};

export default Cryptocurrencies;
