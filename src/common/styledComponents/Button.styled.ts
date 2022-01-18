import styled from "styled-components";

type ButtonProps = {
  clicked: boolean;
};

export const NavButton = styled.button<ButtonProps>`
  background-color: ${(props) => (props.clicked ? "#ffee10" : "#000")};
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0.5rem 0.5rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  position: relative;

  &::before,
  &::after {
    content: "";
    background-color: ${(props) => (props.clicked ? "#000" : "#fff")};
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }

  &::before {
    top: ${(props) => (props.clicked ? "1.5" : "1rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }

  &::after {
    top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }

  &:hover {
    color: #ffee10;
    box-shadow: 0 0 10px #ffee10;
    text-shadow: 0 0 10px #ffee10;
  }
`;
