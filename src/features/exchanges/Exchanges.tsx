import React, { FC } from "react";
import { PageContainer, RouteMotion } from "../../common";
import { useGetCryptoExchangesQuery } from "../../services/cryptoApi";

interface Props {}

const Exchanges: FC = (props: Props) => {
  const { data } = useGetCryptoExchangesQuery({ coinId: "a91GCGd_u96cF" });

  console.log("exchanges data:", data);
  return (
    <RouteMotion>
      <PageContainer>
        <div>Exchanges</div>
      </PageContainer>
    </RouteMotion>
  );
};

export default Exchanges;
