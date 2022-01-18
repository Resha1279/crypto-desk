import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  SidebarContainer,
  NavButton,
  Container,
  Divider,
  Row,
  NavButtonContainer,
} from "..";
import { AiFillHome, AiFillFund, AiFillHeart } from "react-icons/ai";
import {
  BsCurrencyExchange,
  BsFillBookmarksFill,
  BsFilePost,
} from "react-icons/bs";
import { BiNews } from "react-icons/bi";

interface Props {}

const Sidebar = (props: Props) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <Container position="absolute">
      <NavButtonContainer clicked={click}>
        <NavButton clicked={click} onClick={() => handleClick()} />
        <h4>CryptoDesk</h4>
      </NavButtonContainer>
      <SidebarContainer clicked={click}>
        <Link to="/" onClick={() => setClick(false)}>
          <AiFillHome />
          {click ? <h5>Home</h5> : ""}
        </Link>
        <Link to="/cryptocurrencies" onClick={() => setClick(false)}>
          <AiFillFund />
          {click ? <h5>Cryptocurrencies</h5> : ""}
        </Link>
        <Link to="/exchanges" onClick={() => setClick(false)}>
          <BsCurrencyExchange />
          {click ? <h5>Exchanges</h5> : ""}
        </Link>
        <Divider />
        <Link to="/news" onClick={() => setClick(false)}>
          <BiNews />
          {click ? <h5>News</h5> : ""}
        </Link>
        <Link to="/feed" onClick={() => setClick(false)}>
          <BsFilePost />
          {click ? <h5>Feed</h5> : ""}
        </Link>
        <Divider />
        <Link to="/bookmarks" onClick={() => setClick(false)}>
          <BsFillBookmarksFill />
          {click ? <h5>Bookmarks</h5> : ""}
        </Link>
        <Link to="/favourites" onClick={() => setClick(false)}>
          <AiFillHeart />
          {click ? <h5>Favourites</h5> : ""}
        </Link>
      </SidebarContainer>
    </Container>
  );
};

export default Sidebar;
