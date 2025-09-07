import React from "react";

const Card = ({ picture, title, subtitle, price, onAdd }) => {
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
        <div className="col-md-3 mb-4 col-6">
            <div
                className="card h-100 border-0 shadow-sm position-relative"
                style={{
                    borderRadius: "12px",
                    boxShadow:
                        "0 2px 8px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.08)",
                    transition: "transform .2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
                <div className="card-body d-flex flex-column text-center">
                    <div className="w-100 d-flex justify-content-center mb-2">{Img}</div>

                    <h5 className="mb-1 fw-semibold">{title}</h5>
                    <p className="text-muted small mb-5">{subtitle}</p>

                    <div className="mt-auto d-flex align-items-center justify-content-between">
                        <div className="fw-semibold">฿{price}</div>

                        <button
                            type="button"
                            onClick={onAdd}
                            className="btn btn-danger d-flex align-items-center justify-content-center"
                            style={{
                                width: 44,
                                height: 36,
                                borderRadius: 10,
                                boxShadow: "0 2px 6px rgba(220,53,69,.35)",
                            }}
                            aria-label="Add to cart"
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

export default Card;
