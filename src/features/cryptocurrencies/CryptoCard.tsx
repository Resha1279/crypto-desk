import React, { FC } from "react";
import { Cryptos } from "./type";
import { NavLink } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { millify } from "millify";
import styled from "styled-components";
import { motion } from "framer-motion";

interface Props {
  crypto: Cryptos;
  handleFavToggle: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    uuid: string
  ) => void;
  favlist: string[];
}

const CryptoCard: FC<Props> = ({ crypto, handleFavToggle, favlist }) => {
  return (
    <CardContainer>
      <NavLink to={`/crypto/${crypto.uuid}`}>
        <Card color={crypto.color === null ? "blue" : crypto.color}>
          <h5>
            {crypto.name} ({crypto.symbol})
          </h5>
          <CoinLogo src={crypto.iconUrl} alt="icon" />

          <CardContent>
            <p>Price: &#36;{millify(crypto.price)}</p>
            <p>
              BTC Price:{" "}
              {new Intl.NumberFormat("en-US", {
                maximumSignificantDigits: 3,
                style: "currency",
                currency: "BTC",
              }).format(crypto.btcPrice)}
            </p>
            <p>Market Cap: {millify(crypto.marketCap)}</p>
            <p>Daily Change: {millify(crypto.change)}%</p>
            <Rank>#{crypto.rank}</Rank>
          </CardContent>
        </Card>
      </NavLink>
      <IconButton
        onClick={(e) => handleFavToggle(e, crypto.uuid)}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.6 }}
      >
        {favlist.includes(crypto.uuid) ? (
          <AiFillHeart color="red" />
        ) : (
          <HeartOutlined />
        )}
      </IconButton>
    </CardContainer>
  );
};

export default CryptoCard;

type CardProps = {
  color: string;
};

const CardContainer = styled.div`
  position: relative;
  flex: 1 0 10%;
  min-width: 300px;
  max-width: 400px;
`;

const Card = styled.div<CardProps>`
  background-color: var(--bg-secondary-dark);
  padding: 1.5em;
  border: 1px solid;
  border-color: ${({ color }) => color};
  border-radius: 6px;
  cursor: pointer;
  transition: 0.5s ease;
  position: relative;

  &:hover {
    color: #fff;
    box-shadow: ${({ color }) => `0 0 2px #fff, 0 0 10px #fff, 0 0 20px ${color}
      `};
  }

  h5 {
    max-width: 200px;
  }
`;

const CoinLogo = styled.img`
  width: 3em;
  height: 3em;
  border-radius: 50%;
  position: absolute;
  top: -25px;
  right: 14px;
  background-color: var(--white);
  padding: 8px;
`;

const IconButton = styled(motion.div)`
  font-size: 28px;
  position: absolute;
  right: 24px;
  top: 30px;
  padding: 2px;
  width: 30px;
  height: 30px;
  overflow: hidden;
`;

const CardContent = styled.div`
  padding: 20px;
  opacity: 0.6;
`;

const Rank = styled.p`
  position: absolute;
  color: var(--text-secondary-white);
  right: 10px;
  bottom: 0px;
  font-size: 60px;
  opacity: 0.5;
`;

const HeartOutlined = styled(AiOutlineHeart)`
  color: var(--text-secondary-white);
  opacity: 0.5;
`;
