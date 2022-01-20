import React, { FC } from "react";

import { PageContainer, RouteMotion } from "../../common";
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
