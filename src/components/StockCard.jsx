import React from 'react';

function StockCard({ title, value, color }) {
    return (
        <div className="stock-card" style={{ backgroundColor: color }}>
            <h5>{title}</h5>
            <p>{value}</p>
        </div>
    );
}

export default StockCard;