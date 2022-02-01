export interface CoinHistory {
  change: number;
  history: { price: number; timestamp: number }[];
}

export interface Cryptos {
  "24hVolume": string;
  btcPrice: number;
  change: number;
  coinrankingUrl: string;
  color: string;
  iconUrl: string;
  listedAt: number;
  lowVolume: boolean;
  marketCap: number;
  name: string;
  price: number;
  rank: number;
  sparkline: number[];
  symbol: string;
  tier: number;
  uuid: string;
}
