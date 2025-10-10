import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
    return (
        <div className="category-card mt-4">
            <Link to={category.categoryProductPath}>
                <div className="card" style={{ width: '18rem', borderRadius: '10px' }}>
                    <img src={category.categoryProductPath} className="card-img-top" alt={category.categoryName} />
                    <div className="card-body text-center">
                        <h5 className="card-title">{category.categoryName}</h5>
                    </div>
                </div>
            </Link>
        </div>
    );
};

const CategoryList = ({ categories }) => {
    return (
        <div className="category-list d-flex justify-content-around flex-wrap">
            {categories.map((category) => (
                <CategoryCard key={category.categoryId} category={category} />
            ))}
        </div>
    );
};

export default CategoryList;