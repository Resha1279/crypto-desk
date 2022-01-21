import React, { FC } from "react";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Heading1, Heading2, Row } from "../../common";
import { CoinHistory } from "./type";

interface Props {
  coinHistory: CoinHistory;
  currentPrice: string;
  coinName: string;
}

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

const CryptoChart: FC<Props> = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div>
      <Heading1>{coinName} price chart</Heading1>
      <Row spaceBetween>
        <Heading2>{coinHistory?.change}%</Heading2>
        <Heading2>
          Current {coinName} price : $ {currentPrice}
        </Heading2>
      </Row>
      <Line data={data} options={options} />
    </div>
  );
};

export default CryptoChart;
