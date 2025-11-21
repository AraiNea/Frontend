import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StockBarChart from '../../components/BarChart'; // Assuming this is your Chart component
import Adminheader from '../../components/AdminHeader';
import Footer from '../../components/Footer';
import { DatePicker } from 'antd';

function WeeklyStockReport() {
    const [stockData, setStockData] = useState({
        totalRemaining: 0,
        outOfStock: 0,
    });

    const [stockTable, setStockTable] = useState([]);
    const [filteredStockTable, setFilteredStockTable] = useState([]);  // For filtered stock data
    const [selectedDates, setSelectedDates] = useState([null, null]);
    const [searchQuery, setSearchQuery] = useState('');  // Search query state

    // Fetch stock data with optional date filter
    const fetchStockData = async (startDate, endDate) => {
        try {
            // Construct the query params for date range filtering
            const params = {};
            if (startDate && endDate) {
                params.startTime = startDate.format('YYYY-MM-DD');
                params.endTime = endDate.format('YYYY-MM-DD');
            }

            const res = await axios.get('http://localhost:8080/stock/list', { params });
            const totalRemaining = res.data.TotalInventory?.remaining || 0;
            const outOfStock = res.data.TotalInventory?.stockOut || 0;

            setStockData({
                totalRemaining,
                outOfStock,
            });

            // Set stock table data
            setStockTable(res.data.StockTable || []);
            setFilteredStockTable(res.data.StockTable || []);  // Initialize filtered table
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    };

    useEffect(() => {
        fetchStockData(); // Fetch data on component mount
    }, []); // Empty dependency array means this runs only once when component mounts

    // Handle date change
    const handleDateChange = (dates) => {
        setSelectedDates(dates);
        if (dates[0] && dates[1]) {
            fetchStockData(dates[0], dates[1]); // Fetch stock data based on selected date range
        }
    };

    // Handle search query change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter stockTable by product name based on the search query
        const filteredData = stockTable.filter((product) =>
            product.productName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredStockTable(filteredData);
    };

    // Check stock status based on sold and stock quantities
    const getStockStatus = (stock) => {
        if (stock === 0) {
            return 'Out of Stock';  // If sold equals stock, it's sold out
        } else if (stock < 50) {
            return 'Low Stock';  // If stock is less than 50, it's low
        } else {
            return 'In Stock';  // Otherwise, it's in stock
        }
    };

    return (
        <div className="app-layout">
            <Adminheader />
            <main className="main-content">
                <div className="weekly-stock-report">
                    {/* Date Picker */}
                    <div className="date-picker-container ps-3">
                        <h4>Pick the date range for the report</h4>
                        <DatePicker.RangePicker
                            onChange={handleDateChange}
                            format="YYYY-MM-DD"
                        />
                    </div>

                    {/* Stock Summary Cards */}
                    <div className="stock-summary-cards col-6 ps-3">
                        <div className="stock-card green">
                            <div className="title">Total Items Remaining</div>
                            <div className="value">{stockData.totalRemaining}</div>
                        </div>
                        <div className="stock-card orange">
                            <div className="title">Total Sold Out Items</div>
                            <div className="value">{stockData.outOfStock}</div>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <StockBarChart stockTable={filteredStockTable} />

                    {/* Stock Table */}
                    <div className="stock-table-container">
                        <h3>Stock Overview</h3>
                        {/* Search Bar */}
                        <div className="search-bar-container">
                            <input
                                type="text"
                                placeholder="Search by product name"
                                className="search-bar"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <table className="stock-table">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Sold</th>  {/* Added Sold column */}
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStockTable.map((product) => (
                                    <tr key={product.productId}>
                                        <td>{product.productId}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.categoryName}</td>
                                        <td>${product.price}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.sold}</td>  {/* Display sold amount */}
                                        <td>
                                            {getStockStatus(product.stock) === 'Out of Stock' && (
                                                <span className="stock-status-pill out-of-stock">Out of Stock</span>
                                            )}
                                            {getStockStatus(product.stock) === 'Low Stock' && (
                                                <span className="stock-status-pill low-stock">Low Stock</span>
                                            )}
                                            {getStockStatus(product.stock) === 'In Stock' && (
                                                <span className="stock-status-pill in-stock">In Stock</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default WeeklyStockReport;