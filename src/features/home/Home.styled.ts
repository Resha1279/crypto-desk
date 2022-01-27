import styled from "styled-components";

export const CryptoStatsContainer = styled.div`
  display: flex;
  //max-width: 400px;
  flex-wrap: wrap;
  gap: 2em;
  margin-top: 2em;
`;

export const StatsCard = styled.div`
  border: 1px solid var(--dull);
  border-radius: 1rem;
  padding: 1em;
`;

export const Stats = styled.p`
  font-size: 2em;

  min-width: 150px;
  color: var(--primary);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3em;
  margin-top: 4em;
`;
