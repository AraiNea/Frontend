import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CatalogGrid from "../components/Card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import useMessage from "../components/useMessage";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function Home() {
    const { showMessagePermission, showMessageError } = useMessage();
    const navigate = useNavigate();

    const [data, setData] = useState({ results: [] });
    const [heroData, setheroData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:8080/home/");
            if (res.data.results != null) {
                setData(res.data);
            }
            if (res.data.recommendedProducts != null) {
                setheroData(res.data.recommendedProducts);
            }
        } catch (e) {
            if (e.response?.status === 401) {
                showMessagePermission();
            } else {
                showMessageError(e);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredResults = data.results.map((c) => ({
        ...c,
        products: c.products.filter((p) => p.isActive === 1),
    }));

    const filteredHero = heroData.filter(
        (p) => p.isActive === undefined || p.isActive === 1
    );

    return (
        <div className="app-layout">
            <Header />
            <main className="main-content">
                {/* Hero Section */}
                <section className="hero-pizza-section py-4">
                    <div className="container">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            navigation={{
                                prevEl: ".custom-swiper-button-prev",
                                nextEl: ".custom-swiper-button-next",
                            }}
                            loop={filteredHero.length > 1}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            className="hero-swiper"
                        >
                            {filteredHero.map((p) => (
                                <SwiperSlide key={p.recommendedId}>
                                    <div className="d-flex justify-content-center">
                                        <div
                                            className="hero-slide-content text-center"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                navigate(`/product/${p.productId}`)
                                            }
                                        >
                                            <span className="hero-badge">Recommended!!</span>
                                            <img
                                                className="hero-image"
                                                src={`http://localhost:8080${p.recommendImgPath}`}
                                                alt={`Recommended ${p.recommendedId}`}
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="custom-swiper-button custom-swiper-button-prev">
                            <i className="bi bi-chevron-left"></i>
                        </div>
                        <div className="custom-swiper-button custom-swiper-button-next">
                            <i className="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </section>

                {/* Body */}
                <CatalogGrid
                    data={{ ...data, results: filteredResults }}
                    onProductClick={(id) => navigate(`/product/${id}`)}
                />
            </main>
            <Footer />
        </div>
    );
}


export default Home;
