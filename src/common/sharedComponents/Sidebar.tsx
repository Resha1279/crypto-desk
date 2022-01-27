import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Divider } from "../../style/common.styled";
import { AiFillHome, AiFillFund, AiFillHeart } from "react-icons/ai";
import {
  BsCurrencyExchange,
  BsFillBookmarksFill,
  BsFilePost,
} from "react-icons/bs";
import { BiNews, BiMenu } from "react-icons/bi";
import styled from "styled-components";
import { motion } from "framer-motion";

interface Props {}

const Sidebar = (props: Props) => {
  const [click, setClick] = useState(true);
  const handleClick = () => setClick(!click);
  return (
    <div>
      <NavButtonContainer clicked={click}>
        <NavButton
          clicked={click}
          onClick={() => handleClick()}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.6 }}
        >
          <BiMenu />
        </NavButton>
        <h6>¢ryptodesk</h6>
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
    </div>
  );
};

export default Sidebar;

type SidebarContainerProps = {
  clicked: boolean;
};

type ButtonProps = {
  clicked: boolean;
};

const SidebarContainer = styled.div<SidebarContainerProps>`
  background-color: var(--bg-secondary-dark);
  width: 3.5rem;
  height: 80vh;
  margin-top: 4rem;
  border-radius: 0 20px 20px 0;
  padding: 3rem 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  position: fixed;

  width: ${(props) => (props.clicked ? "15rem" : "3.5rem")};
  transition: all 0.5s ease;
  .active {
    border: ${(props) => (props.clicked ? "none" : "2px solid var(--primary)")};
    border-right: ${(props) =>
      props.clicked ? "4px solid var(--primary)" : "2px solid var(--primary)"};
  }

  a {
    position: relative;
    display: ${(props) => (props.clicked ? "flex" : "block")};
    align-items: center;
    width: ${(props) => (props.clicked ? "100%" : "34px")};
    height: ${(props) => (props.clicked ? "" : "34px")};
    text-align: center;
    line-height: 32px;
    background: var(--bg-secondary-dark);
    border-radius: ${(props) => (props.clicked ? "0px" : "50%")};
    font-size: 1.2em;

    color: var(--white);
    border: ${(props) =>
      props.clicked ? "none" : "2px solid var(--bg-secondary-dark)"};
    padding-left: ${(props) => (props.clicked ? "1em" : "none")};

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: ${(props) => (props.clicked ? "0px" : "50%")};
      background: ${(props) => (props.clicked ? "none" : "var(--primary)")};
      transition: 0.5s ease;
      transform: ${(props) => (props.clicked ? "none" : "scale(0.9)")};
      z-index: -1;
    }
    &:hover::before {
      transform: scale(1.1);
      box-shadow: ${(props) =>
        props.clicked ? "none" : "0 0 18px var(--primary)"};
    }
    &:hover {
      color: var(--primary);
      box-shadow: ${(props) =>
        props.clicked ? "none" : " 0 0 10px var(--primary)"};
      text-shadow: ${(props) =>
        props.clicked ? "none" : " 0 0 10px var(--primary)"};
      border: ${(props) =>
        props.clicked ? "none" : "2px solid var(--primary)"};
      border-right: 2px solid var(--primary);
      transition: 0.5s ease;
    }

    h5 {
      margin-left: 1.1em;
    }
  }
`;

const NavButtonContainer = styled.div<SidebarContainerProps>`
  width: ${(props) => (props.clicked ? "15rem" : "0px")};
  height: 3.6rem;
  background-color: var(--bg-secondary-dark);
  display: ${(props) => (props.clicked ? "flex" : "")};
  align-items: center;
  border-radius: 0 20px 20px 0;
  transition: 0.5s ease;
  position: fixed;

  h6 {
    display: ${(props) => (props.clicked ? "inline" : "none")};
    margin-bottom: 0.1em;
    margin-left: 2.5em;
    color: var(--white);
    font-family: "Federant", cursive;
    font-size: 24px;
    overflow: hidden;
  }
`;

const NavButton = styled(motion.button)<ButtonProps>`
  background-color: ${(props) =>
    props.clicked ? "var(--primary)" : "var(--bg-secondary-dark)"};
  border: 1px solid var(--bg-secondary-dark);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0.1rem 0.5rem;
  cursor: pointer;
  color: ${(props) =>
    props.clicked ? "var(--bg-secondary-dark)" : "var(--white)"};
  padding: 0;
  font-size: x-large;
  position: absolute;
  top: 1px;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
`;
