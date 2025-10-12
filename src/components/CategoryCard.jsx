import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category, index }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/category/${category.categoryName}`);
    };

    return (
        <div
            className={`category-card category-${index}`}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
        >
            <div className="category-content">
                <img
                    src={`http://localhost:8080${category.categoryImgPath}`}
                    alt={category.categoryName}
                    className="category-image"
                />
            </div>
            <h5 className="category-title">{category.categoryName}</h5>
        </div>
    );
};

const CategoryList = ({ categories }) => {
    return (
        <div className="category-list d-flex justify-content-start flex-wrap gap-4 mt-4 ps-4">
            {categories.map((category, index) => (
                <CategoryCard
                    key={category.categoryId}
                    category={category}
                    index={index + 1}
                />
            ))}
        </div>
    );
};

export default CategoryList;