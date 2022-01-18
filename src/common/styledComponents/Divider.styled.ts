import styled from "styled-components";

type DividerProps = {
  width?: string;
  height?: string;
  color?: string;
};

export const Divider = styled.div<DividerProps>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "1px")};
  background-color: ${(props) => (props.color ? props.color : "#999")};
`;
