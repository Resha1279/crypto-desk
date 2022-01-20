import React, { FC } from "react";
import { PageContainer, RouteMotion } from "../../common";

interface Props {}

const Bookmarks: FC = (props: Props) => {
  return (
    <RouteMotion>
      <PageContainer>
        <div>Bookmarks</div>
      </PageContainer>
    </RouteMotion>
  );
};

export default Bookmarks;
