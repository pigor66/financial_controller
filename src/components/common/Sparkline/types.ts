export interface SparklineProps {
  type: 'line' | 'bar' | 'doughnut';
  data: {
    labels?: string[];
    datasets: any[];
  };
  width?: number;
  height?: number;
}

export interface SparklineData {
  labels: string[];
  datasets: Array<{
    data: number[];
    borderColor?: string;
    backgroundColor?: string | string[];
    tension?: number;
    pointRadius?: number;
    pointHoverRadius?: number;
    borderWidth?: number;
  }>;
}
