import React, { FC } from "react";
import moment from "moment";
import styled from "styled-components";
import { CryptoNews } from "./type";
import {
  BsBookmarkPlusFill,
  BsBookmarkPlus,
  BsBookmarkCheckFill,
} from "react-icons/bs";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { addBookmark, removeBookmark } from "../bookmarks/bookmarksSlice";

type Props = {
  news: CryptoNews;
};

const placeholderImage: string =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDY2MYpu6UCHltaBhcYxzdmtLHUImp4c8dPg&usqp=CAU";

const NewsCard: FC<Props> = (props) => {
  const bookmarkList: CryptoNews[] = useSelector(
    (state: RootState) => state.bookmarks.value
  );

  const dispatch = useDispatch();

  const handleonBookmarkToggle = () => {
    const bookmarkIndex = bookmarkList.findIndex(
      (bookmark: CryptoNews) => bookmark.url === props.news.url
    );
    if (bookmarkIndex === -1) {
      dispatch(addBookmark({ news: props.news }));
    } else {
      dispatch(removeBookmark({ url: props.news.url }));
    }
  };

  return (
    <Card>
      <a href={props.news.url} target="_blank" rel="noreferrer">
        <TitleContainer>
          <ContentImage
            src={props.news.image?.thumbnail?.contentUrl || placeholderImage}
            alt="news"
          />
          <h2>{props.news.name}</h2>
        </TitleContainer>
        <Description>{props.news.description}</Description>
        <SourceContainer>
          <SourceImage
            src={
              props.news.provider[0]?.image?.thumbnail?.contentUrl ||
              placeholderImage
            }
            alt="newssource"
          />
          <span>{props.news.provider[0].name}</span>
          &nbsp;&#8226;&nbsp;
          <span>{moment(props.news.datePublished).fromNow()}</span>
        </SourceContainer>
      </a>
      <BookmarkButtonContainer
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.6 }}
        onClick={handleonBookmarkToggle}
      >
        {bookmarkList.findIndex(
          (bookmark: CryptoNews) => bookmark.url === props.news.url
        ) === -1 ? (
          <BsBookmarkPlus fontSize={30} color="white" />
        ) : (
          <BsBookmarkCheckFill fontSize={30} color="white" />
        )}
      </BookmarkButtonContainer>
    </Card>
  );
};

export default NewsCard;

const Card = styled.div`
  border: 0.5px solid #fff;
  min-width: 400px;
  position: relative;
  padding: 1em;
  min-height: 360px;
  flex: 1;
  transition: all 0.5s ease;

  &:hover {
    box-shadow: 0 0 2px var(--white), 0 0 10px var(--white);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-right: 1.5em;
`;

const ContentImage = styled.img`
  width: 100px;
  height: 100px;
`;

const SourceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SourceImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--white);
  object-fit: cover;
  padding: 2px;
  margin-right: 1em;
`;

const Description = styled.div`
  text-align: justify;
  padding: 2em 0;
  color: var(--dull);
`;

const BookmarkButtonContainer = styled(motion.div)`
  position: absolute;
  top: 8px;
  right: 4px;
  cursor: pointer;
`;
