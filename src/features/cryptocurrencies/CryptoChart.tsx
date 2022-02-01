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
import { CoinHistory } from "./type";
import styled from "styled-components";
import { motion } from "framer-motion";

interface Props {
  coinHistory: CoinHistory;
  currentPrice: string;
  coinName: string;
  coinColor: string;
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

const CryptoChart: FC<Props> = ({
  coinHistory,
  currentPrice,
  coinName,
  coinColor,
}) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory?.history[i].timestamp).toDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: true,
        backgroundColor: coinColor,
        borderColor: "#fff",
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
    <ChartContainer
      initial={{ opacity: 0.5 }}
      animate={{
        opacity: 1,
      }}
    >
      <ChartHeader color={coinColor}>
        <h1>{coinName} price chart</h1>

        <h5>
          Current {coinName} price : $ {currentPrice} ({coinHistory?.change}%)
        </h5>
      </ChartHeader>

      <Line data={data} options={options} />
    </ChartContainer>
  );
};

export default CryptoChart;

type ChartHeaderProps = {
  color: string;
};

const ChartContainer = styled(motion.div)`
  padding: 2em;
  border-radius: 1em;
  margin: 2em 0;
  border: 1px solid var(--dull);
`;

const ChartHeader = styled.div<ChartHeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;
  /* 
  h1,
  h4 {
    color: ${({ color }) => color};
  } */
`;
