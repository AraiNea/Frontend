import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeeklyStockReportChart from '../../components/WeeklyChart.jsx';
import useMessage from '../../components/useMessage';

axios.defaults.withCredentials = true;

const WeeklyStockReport = () => {
    const { showMessageError } = useMessage();
    const [stockData, setStockData] = useState([]);
    const [totalRemaining, setTotalRemaining] = useState(0);
    const [totalOutOfStock, setTotalOutOfStock] = useState(0);
    const [selectedRange, setSelectedRange] = useState("Weekly"); // ช่วงเวลาที่เลือก

    // ตั้งค่าพารามิเตอร์สำหรับช่วงเวลา
    const timeRanges = {
        Weekly: { startTime: '2025-07-01', endTime: '2025-07-07' },
        Monthly: { startTime: '2025-07-01', endTime: '2025-07-31' },
        Custom: { startTime: '', endTime: '' }, // กำหนดเป็นค่าที่ผู้ใช้เลือก
    };

    useEffect(() => {
        const fetchStockReport = async () => {
            const { startTime, endTime } = timeRanges[selectedRange];

            try {
                const res = await axios.get('http://localhost:8080/stock/list', {
                    params: { startTime, endTime },
                });
                setStockData(res.data.stockTable);

                const remaining = res.data.stockTable.reduce((acc, item) => acc + item.stock, 0);
                const outOfStock = res.data.stockTable.filter(item => item.stock === 0).length;
                setTotalRemaining(remaining);
                setTotalOutOfStock(outOfStock);
            } catch (error) {
                showMessageError(error);
            }
        };

        fetchStockReport();
    }, [selectedRange]);

    // คำนวณสถานะสินค้าตามสต็อก
    const getStockStatus = (stock) => {
        if (stock === 0) return 'Out of Stock';
        if (stock <= 10) return 'Low Stock';
        return 'In Stock';
    };

    return (
        <div className="weekly-stock-report-container">
            <div className="weekly-stock-report-header">
                <h2>Weekly Stock Report</h2>
                
                <div className="date-range-selector">
                    <button onClick={() => setSelectedRange('Weekly')}>Weekly</button>
                    <button onClick={() => setSelectedRange('Monthly')}>Monthly</button>
                    <button onClick={() => setSelectedRange('Custom')}>Custom</button>
                </div>

                <div>
                    <p>Total Items Remaining: <span className="total-items">{totalRemaining}</span></p>
                    <p>Out of Stock: <span className="out-of-stock">{totalOutOfStock}</span></p>
                </div>
            </div>
            
            <WeeklyStockReportChart startTime={timeRanges[selectedRange].startTime} endTime={timeRanges[selectedRange].endTime} />

            <div className="stock-table">
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Sold</th>
                            <th>Stock Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockData.map((item) => (
                            <tr key={item.productId}>
                                <td>{item.productId}</td>
                                <td>{item.productName}</td>
                                <td>{item.categoryName}</td>
                                <td>${item.price}</td>
                                <td>{item.stock}</td>
                                <td>{item.sold}</td>
                                <td>{getStockStatus(item.stock)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WeeklyStockReport;