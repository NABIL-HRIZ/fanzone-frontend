import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/ShowZones.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ShowZones = () => {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/show-zones");
      setZones(res.data.data);
    } catch (error) {
      console.error("Erreur lors du chargement des zones :", error);
    } 
  };

  return (
    <section className="showZones-section" data-aos="fade-up">
      <h1 className="showZones-title">Fan Zones</h1>
      
      <div className="floating-elements">
        <span>⚽</span>
        <span>🏆</span>
        <span>🇲🇦</span>
        <span>⭐</span>
        <span>🎯</span>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="zonesSwiper"
      >
        {zones.map((zone) => (
          <SwiperSlide key={zone.id}>
            <div className="zone-card">
              <img
                src={`http://127.0.0.1:8000/storage/${zone.image}`}
                alt={zone.name}
              />
              <div className="zone-basic-info">
                <h3>{zone.name}</h3>
                <span>{zone.city}</span>
              </div>
              
              
              <div className="hover-content">
                <h4>{zone.name}</h4>
                <p>Vivez l'expérience unique de la Fan Zone {zone.name} à {zone.city}</p>
                <button className="details-btn">Voir Détails</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ShowZones;