import React, { FC } from "react";

import { RouteMotion } from "../../common";
import { PageContainer } from "../../style/common.styled";
import NewsList from "./NewsList";

interface Props {}

const News: FC = (props: Props) => {
  return (
    <RouteMotion>
      <PageContainer>
        <div>news</div>
        <NewsList />
      </PageContainer>
    </RouteMotion>
  );
};

export default News;
