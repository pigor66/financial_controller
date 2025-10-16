import React from 'react';
import {
    Line,
    Bar,
    Doughnut,
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { SparklineProps } from './types';
import { getChartOptions } from './styles';

// Registrar componentes do Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

export const Sparkline: React.FC<SparklineProps> = ({
    type,
    data,
    width = 80,
    height = 40
}) => {
    const options = getChartOptions(type, width, height);

    const chartData = {
        labels: data.labels || [],
        datasets: data.datasets || []
    };

    return (
        <div style={{ width, height }}>
            <Chart type={type} data={chartData} options={options} />
        </div>
    );
};
