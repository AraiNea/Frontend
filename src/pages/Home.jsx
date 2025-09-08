// src/pages/Home.jsx
import React from "react";
import Header from "../components/Header";
import CatalogGrid from "../components/Card"; // <- ตัว CatalogGrid ที่เราทำไว้
import { useNavigate } from "react-router-dom";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function Home() {
    const navigate = useNavigate();

    const mockData = {
        results: [
            {
                category: { categoryId: 1, categoryName: "PIZZA" },
                products: [
                    {
                        categoryId: 1,
                        productId: 1,
                        productName: "Margherita Pizza",
                        productDetail: "Mozzarella, tomato sauce & basil",
                        productPrice: 299,
                        imageUrl: "/assets/img/pizza/Hawaiian.png",
                    },
                    {
                        categoryId: 1,
                        productId: 2,
                        productName: "Pepperoni Pizza",
                        productDetail: "Pepperoni & mozzarella",
                        productPrice: 349,
                        imageUrl: "/assets/img/pizza/Hawaiian.png",
                    },
                    {
                        categoryId: 1,
                        productId: 3,
                        productName: "Margherita Pizza",
                        productDetail: "Mozzarella, tomato sauce & basil",
                        productPrice: 299,
                        imageUrl: "/assets/img/pizza/Hawaiian.png",
                    },
                    {
                        categoryId: 1,
                        productId: 4,
                        productName: "Pepperoni Pizza",
                        productDetail: "Pepperoni & mozzarella",
                        productPrice: 349,
                        imageUrl: "/assets/img/pizza/Hawaiian.png",
                    },
                    {
                        categoryId: 1,
                        productId: 5,
                        productName: "Margherita Pizza",
                        productDetail: "Mozzarella, tomato sauce & basil",
                        productPrice: 299,
                        imageUrl: "/assets/img/pizza/Hawaiian.png",
                    },
                    {
                        categoryId: 1,
                        productId: 6,
                        productName: "Pepperoni Pizza",
                        productDetail: "Pepperoni & mozzarella",
                        productPrice: 349,
                        imageUrl: "/assets/img/pizza/Hawaiian.png",
                    },
                ],
            },
            {
                category: { categoryId: 2, categoryName: "APPETIZER" },
                products: [
                    {
                        categoryId: 2,
                        productId: 10,
                        productName: "BBQ chicken wings",
                        productDetail: "6 pcs.",
                        productPrice: 149,
                        imageUrl: "/assets/img/pizza/Hawaiian.png",
                    },
                    {
                        categoryId: 2,
                        productId: 11,
                        productName: "Garlic bread",
                        productDetail: "12 pcs.",
                        productPrice: 79,
                        imageUrl: "/assets/img/pizza/Hawaiian.png",
                    },
                ],
            },
        ],
    };

    const heroProducts = [
        {
            id: 1,
            name: "Hawaiian Pizza",
            image: "/assets/img/pizza/Hawaiian.png",
            route: "/product/1",
        },
        {
            id: 2,
            name: "Double Pepperoni",
            image: "/assets/img/pizza/Kai.png",
            route: "/product/2",
        },
        {
            id: 3,
            name: "Cheese Lovers",
            image: "/assets/img/pizza/Water.png",
            route: "/product/3",
        },
    ];

    return (
        <>
            <Header />

            {/* Hero Section */}
            {/* Hero Section */}
            <section className="hero-pizza-section py-4">
                <div className="container">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation
                        loop
                        autoplay={{
                            delay: 3000,      // 3 วิ ต่อการเลื่อน
                            disableOnInteraction: false, // ให้เลื่อนต่อแม้ผู้ใช้ลากเอง
                        }}
                        className="hero-swiper"
                    >
                        {heroProducts.map((p) => (
                            <SwiperSlide key={p.id}>
                                <div className="d-flex justify-content-center">
                                    <div
                                        className="hero-slide-content text-center"
                                        onClick={() => navigate(p.route)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            style={{ maxWidth: "450px", width: "100%", borderRadius: 8 }}
                                        />
                                        <h3 className="mt-3 fw-bold">{p.name}</h3>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* Body */}
            <CatalogGrid data={mockData} />
        </>
    );
}

export default Home;
