import React, { FC } from "react";
import { PageContainer, RouteMotion } from "../../common";

interface Props {}

const Exchanges: FC = (props: Props) => {
  return (
    <RouteMotion>
      <PageContainer>
        <div>Exchanges</div>
      </PageContainer>
    </RouteMotion>
  );
};

export default Exchanges;
