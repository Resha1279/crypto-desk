import styled from "styled-components";

type ContainerProps = {
  absolute?: boolean;
};

type SidebarContainerProps = {
  clicked: boolean;
};

export const Container = styled.div<ContainerProps>`
  position: ${({ absolute }) => (absolute ? "absolute" : "relative")};
`;

export const PageContainer = styled.div`
  padding: 0rem 4rem 0 18rem;
`;

export const SidebarContainer = styled.div<SidebarContainerProps>`
  background-color: #000;
  width: 3.5rem;
  height: 80vh;
  margin-top: 4rem;
  border-radius: 0 20px 20px 0;
  padding: 2rem 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: fixed;

  width: ${(props) => (props.clicked ? "14rem" : "3.5rem")};
  transition: all 0.5s ease;
  .active {
    border: ${(props) => (props.clicked ? "none" : "2px solid #ffee10")};
    border-right: ${(props) =>
      props.clicked ? "4px solid #ffee10" : "2px solid #ffee10"};
  }

  a {
    position: relative;
    display: ${(props) => (props.clicked ? "flex" : "block")};
    align-items: center;
    width: ${(props) => (props.clicked ? "100%" : "34px")};
    height: ${(props) => (props.clicked ? "" : "34px")};
    text-align: center;
    line-height: 32px;
    background: #000;
    border-radius: ${(props) => (props.clicked ? "0px" : "50%")};
    font-size: 1.2em;

    color: var(--white);
    border: ${(props) => (props.clicked ? "none" : "2px solid #000")};
    padding-left: ${(props) => (props.clicked ? "1em" : "none")};

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: ${(props) => (props.clicked ? "0px" : "50%")};
      background: ${(props) => (props.clicked ? "none" : "#ffee10")};
      transition: 0.5s ease;
      transform: ${(props) => (props.clicked ? "none" : "scale(0.9)")};
      z-index: -1;
    }
    &:hover::before {
      transform: scale(1.1);
      box-shadow: ${(props) => (props.clicked ? "none" : "0 0 18px #ffee10")};
    }
    &:hover {
      color: #ffee10;
      box-shadow: ${(props) => (props.clicked ? "none" : " 0 0 10px #ffee10")};
      text-shadow: ${(props) => (props.clicked ? "none" : " 0 0 10px #ffee10")};
      border: ${(props) => (props.clicked ? "none" : "2px solid #ffee10")};
      border-right: 2px solid #ffee10;
      transition: 0.5s ease;
    }

    h5 {
      margin-left: 1.1em;
    }
  }
`;

export const NavButtonContainer = styled.div<SidebarContainerProps>`
  width: ${(props) => (props.clicked ? "14rem" : "0px")};
  background-color: #000;
  display: ${(props) => (props.clicked ? "flex" : "")};
  align-items: ${(props) => (props.clicked ? "center" : "")};
  border-radius: 0 20px 20px 0;
  transition: all 0.5s ease;
  position: fixed;

  h4 {
    display: ${(props) => (props.clicked ? "inline" : "none")};
    margin-left: 0.5em;
    color: #fff;
    font-family: "Federant", cursive;
    font-size: 26px;
    overflow: hidden;
  }
`;
