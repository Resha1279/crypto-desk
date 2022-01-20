import styled from "styled-components";

export const Heading1 = styled.h2`
  color: var(--text-primary-black);
  font-size: 2em;
  margin-bottom: 1em;
  font-weight: 600;
`;
export const Heading2 = styled.h2`
  color: var(--text-secondary-black);
`;
export const Heading3 = styled.p`
  color: var(--text-secondary-black);
  font-weight: bold;
  font-size: 1em;
`;
export const Link1 = styled.p`
  cursor: pointer;

  padding: 4px 20px;
  border-radius: 15px;
  border: 4px solid #000;
  font-weight: 600;
  transition: all 0.5s ease;

  &:hover {
    border: 4px solid var(--text-color);
  }
`;
export const Link2 = styled.p``;
export const Link3 = styled.p`
  cursor: pointer;
`;
export const Subtitle = styled.p`
  font-size: 2em;
  opacity: 0.6;
`;
export const Caption = styled.p``;
export const ColoredText = styled.p`
  color: #78641c;
  font-size: 1.1em;
`;
