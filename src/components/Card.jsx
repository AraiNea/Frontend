// CatalogGrid.jsx
import React from "react";

/** การ์ดสินค้า */
const ProductCard = ({ picture, title, subtitle, price, onAdd }) => {
    const Img =
        typeof picture === "string" ? (
            <img
                src={picture}
                alt={title}
                className="img-fluid"
                style={{
                    maxWidth: 140,
                    height: "auto",
                    objectFit: "contain",
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,.15))",
                }}
            />
        ) : (
            picture
        );

    return (
        <div className="col-12 col-sm-6 col-md-3 mb-4">
            <div
                className="card h-100 border-0 shadow-sm position-relative"
                style={{
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.08)",
                }}
            >
                <div className="card-body d-flex flex-column text-center">
                    <div className="w-100 d-flex justify-content-center mb-2">{Img}</div>

                    <h5 className="mb-1 fw-semibold">{title}</h5>
                    {subtitle && <p className="text-muted small mb-5">{subtitle}</p>}

                    <div className="mt-auto d-flex align-items-center justify-content-between">
                        <div className="fw-semibold">${price}</div>
                        <button
                            type="button"
                            className="btn btn-danger d-flex align-items-center justify-content-center"
                            style={{ width: 44, height: 36, borderRadius: 10 }}
                            onClick={onAdd}
                            title="Add to cart"
                        >
                            <i className="bi bi-cart" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/** กริดแสดงหมวดหมู่ + สินค้า 4 ใบ/แถว */
const CatalogGrid = ({ data }) => {
    // data format: { results: [ { category:{categoryId, categoryName}, products:[...] }, ... ] }
    const groups = [...(data?.results ?? [])].sort(
        (a, b) => a.category.categoryId - b.category.categoryId
    );

    return (
        <div className="container px-0">
            {groups.map((group) => (
                <section key={group.category.categoryId} className="mb-5">
                    <h4 className="fw-bold text-uppercase mb-3">
                        {group.category.categoryName}
                    </h4>

                    <div className="row">
                        {group.products?.map((p) => (
                            <ProductCard
                                key={p.productId}
                                // ใช้รูปจาก URL หรือปล่อยว่างก็ได้
                                picture={p.imageUrl || "/images/placeholder.png"}
                                title={p.productName}
                                subtitle={p.productDetail}
                                price={p.productPrice}
                                onAdd={() => console.log("add", p.productId)}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default CatalogGrid;
