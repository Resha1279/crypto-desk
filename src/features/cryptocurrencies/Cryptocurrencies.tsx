import React, { FC } from "react";

import { RouteMotion } from "../../common";
import { PageContainer } from "../../style/common.styled";
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
