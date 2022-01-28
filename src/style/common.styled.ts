import styled from "styled-components";

type DividerProps = {
  width?: string;
  height?: string;
  color?: string;
};

type RowProps = {
  spaceBetween?: boolean;
  align?: string;
  gap?: number;
  justify?: string;
};

export const PageContainer = styled.div`
  padding: 3rem 5rem 3rem 9rem;

  @media (max-width: 900px) {
    padding: 2rem 2rem 2rem 4.5rem;
  }
`;

export const SectionContainer = styled.div`
  padding: 0 0 3rem 0;
`;

export const Divider = styled.div<DividerProps>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "1px")};
  background-color: ${(props) => (props.color ? props.color : "#999")};
`;

export const Row = styled.div<RowProps>`
  display: flex;
  justify-content: ${({ spaceBetween, justify }) =>
    spaceBetween ? "space-between" : justify || "none"};
  align-items: ${({ align }) => (align ? align : "center")};
  gap: ${({ gap }) => (gap ? `${gap}px` : "0px")};
  flex-wrap: wrap;
`;
