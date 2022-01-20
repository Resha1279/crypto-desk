import styled from "styled-components";

type RowProps = {
  spaceBetween?: boolean;
  width?: number;
  gap?: number;
};
type ColumnProps = {
  width?: string;
};

export const Row = styled.div<RowProps>`
  display: flex;
  justify-content: ${({ spaceBetween }) =>
    spaceBetween ? "space-between" : "none"};
  align-items: center;
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  gap: ${({ gap }) => (gap ? `${gap}px` : "0px")};
  flex-wrap: wrap;
  transition: 0.5s ease;

  a {
    flex: 1 0 10%; /* explanation below */
    min-width: 300px;
    max-width: 400px;
  }
`;
export const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  min-width: ${({ width }) => (width ? width : "100%")};
`;
