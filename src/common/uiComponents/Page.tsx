import React, { FC, useEffect } from "react";

interface Props {}

const Page: FC<Props> = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return <main>{children}</main>;
};

export default Page;
