import React, { FC } from "react";
import { RouteMotion } from "../../common";
import { PageContainer } from "../../style/common.styled";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import NewsCard from "../news/NewsCard";
import { CryptoNews } from "../news/type";
import styled from "styled-components";

interface Props {}

const Bookmarks: FC = (props: Props) => {
  const bookmarkList: CryptoNews[] = useSelector(
    (state: RootState) => state.bookmarks.value
  );

  return (
    <RouteMotion>
      <PageContainer>
        <h1>Bookmarks</h1>
        <CardContainer>
          {bookmarkList.map((item: CryptoNews) => (
            <NewsCard key={item.url} news={item} />
          ))}
        </CardContainer>
      </PageContainer>
    </RouteMotion>
  );
};

export default Bookmarks;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  margin-top: 3em;
`;
