import React, { FC } from "react";
import { Row } from "..";
import Sidebar from "./Sidebar";

interface Props {}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <Row>
        <div>sidebar</div>
        {children}
      </Row>
      <footer>footer</footer>
    </div>
  );
};

export default Layout;
