export interface CoinHistory {
  change: number;
  history: { price: number; timestamp: number }[];
}
