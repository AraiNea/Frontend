import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

function StockBarChart({ stockTable }) {
    const [chartData, setChartData] = useState({
        options: {
            chart: {
                type: 'bar',
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: [], // Product names
            },
            colors: ['#FF928A'], // Single color for all bars
        },
        series: [], // Stock quantities
    });

    useEffect(() => {
        if (stockTable && stockTable.length > 0) {
            const categories = stockTable.map((item) => item.productName); // Get product names
            const stockValues = stockTable.map((item) => item.stock); // Get stock quantities

            setChartData({
                options: {
                    ...chartData.options,
                    xaxis: {
                        categories: categories, // Set product names as x-axis labels
                    },
                },
                series: [
                    {
                        name: 'Stock',
                        data: stockValues, // Set stock quantities as the series data
                    },
                ],
            });
        }
    }, [stockTable]); // Re-run when stockTable changes

    return (
        <div>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={350}
            />
        </div>
    );
}

export default StockBarChart;