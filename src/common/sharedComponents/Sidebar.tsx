import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  SidebarContainer,
  NavButton,
  Container,
  Divider,
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
  const [click, setClick] = useState(true);
  const handleClick = () => setClick(!click);
  return (
    <Container absolute>
      <NavButtonContainer clicked={click}>
        <NavButton clicked={click} onClick={() => handleClick()} />
        <h4>¢ryptodesk</h4>
      </NavButtonContainer>
      <SidebarContainer clicked={click}>
        <NavLink to="/" onClick={() => setClick(false)}>
          <AiFillHome />
          {click ? <h5>Home</h5> : ""}
        </NavLink>
        <NavLink to="/cryptocurrencies" onClick={() => setClick(false)}>
          <AiFillFund />
          {click ? <h5>Cryptocurrencies</h5> : ""}
        </NavLink>
        <NavLink to="/exchanges" onClick={() => setClick(false)}>
          <BsCurrencyExchange />
          {click ? <h5>Exchanges</h5> : ""}
        </NavLink>
        <Divider />
        <NavLink to="/news" onClick={() => setClick(false)}>
          <BiNews />
          {click ? <h5>News</h5> : ""}
        </NavLink>
        <NavLink to="/feed" onClick={() => setClick(false)}>
          <BsFilePost />
          {click ? <h5>Feed</h5> : ""}
        </NavLink>
        <Divider />
        <NavLink to="/bookmarks" onClick={() => setClick(false)}>
          <BsFillBookmarksFill />
          {click ? <h5>Bookmarks</h5> : ""}
        </NavLink>
        <NavLink to="/favourites" onClick={() => setClick(false)}>
          <AiFillHeart />
          {click ? <h5>Favourites</h5> : ""}
        </NavLink>
      </SidebarContainer>
    </Container>
  );
};

export default Sidebar;
