import React, { FC } from "react";
import { RouteMotion } from "../../common";

interface Props {}

const Home: FC = (props: Props) => {
  return (
    <RouteMotion>
      <div>Home</div>
    </RouteMotion>
  );
};

export default Home;
