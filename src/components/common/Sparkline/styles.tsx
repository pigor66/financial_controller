import { ChartOptions } from 'chart.js';

export const getChartOptions = (
    type: 'line' | 'bar' | 'doughnut',
    width: number,
    height: number
): ChartOptions<any> => {
    const baseOptions: ChartOptions<any> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        scales: type === 'doughnut' ? {} : {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
        elements: {
            point: {
                radius: 2,
                hoverRadius: 3,
            },
        },
        interaction: {
            intersect: false,
            mode: 'index' as const,
        },
    };

    if (type === 'line') {
        return {
            ...baseOptions,
            elements: {
                point: {
                    radius: 1,
                    hoverRadius: 2,
                },
                line: {
                    tension: 0.4,
                    borderWidth: 2,
                },
            },
        };
    }

    if (type === 'bar') {
        return {
            ...baseOptions,
            elements: {
                bar: {
                    borderRadius: 2,
                    borderSkipped: false,
                },
            },
        };
    }

    if (type === 'doughnut') {
        return {
            ...baseOptions,
            cutout: '75%',
            elements: {
                arc: {
                    borderWidth: 0,
                },
            },
        };
    }

    return baseOptions;
};

export const getSparklineColors = (type: 'income' | 'expense' | 'balance' | 'predicted') => {
    const colors = {
        income: {
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
        },
        expense: {
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
        },
        balance: {
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
        },
        predicted: {
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
        },
    };

    return colors[type];
};
