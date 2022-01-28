import styled from "styled-components";

export const CryptoStatsContainer = styled.div`
  display: flex;

  flex-wrap: wrap;
  gap: 2.5em;
  margin-top: 2em;
`;

export const StatsCard = styled.div`
  border: 1px solid var(--dull);
  border-radius: 8px;
  padding: 0.5em 0.5em 2.5em 0.5em;
  position: relative;
  width: 150px;
`;

export const Stats = styled.p`
  font-size: 2.5em;

  width: 150px;
  color: var(--white);
  position: absolute;
  background-color: #22a079;
  bottom: -0.6em;
  right: -0.6em;
  text-align: center;
  border-radius: 8px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3em;
  margin-top: 4em;
`;
