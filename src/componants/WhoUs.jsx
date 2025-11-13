import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/WhoUs.css";

import fan1 from "../assets/who-us-pic.jpg";
import fan2 from "../assets/fan-zone1.webp";
import fan3 from "../assets/fan-zone3.jpg";
import fan4 from "../assets/fan-zone4.jpeg";

const WhoUs = () => {
  return (
    <section className="who-us">
      <div className="who-us-container">

        
        <div className="who-us-image">
          <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={30}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="whoUsSwiper"
          >
            <SwiperSlide>
              <img src={fan4} alt="Supporters marocains en fête" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={fan2} alt="Ambiance dans une Fan Zone" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={fan3} alt="Public en célébration" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={fan1} alt="Match diffusé sur écran géant" />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="who-us-content">
          <h2 className="who-us-title">Qui sommes-nous ?</h2>
          <h3 className="who-us-subtitle">
            La passion du football, partagée par tous les Marocains 🇲🇦
          </h3>

          <p className="who-us-description">
            <strong>Fan Zon</strong> est la plateforme officielle dédiée à la{" "}
            <span>CAN Maroc 2025</span>, rassemblant tous les amoureux du football
            autour d’un même objectif :{" "}
            <em>vivre l’émotion du jeu ensemble</em>.
          </p>

          <p className="who-us-description">
            Notre mission est de connecter les supporters à travers des{" "}
            <strong>Fan Zones officielles</strong> réparties dans tout le Maroc,
            où chaque match devient une fête. Réservez vos places, découvrez les
            événements locaux et vibrez au rythme des plus grands moments du
            football africain !
          </p>

          <div className="who-us-stats">
            <div className="stat-box">
              <h4>+ 20</h4>
              <p>Fan Zones actives</p>
            </div>
            <div className="stat-box">
              <h4>+ 50</h4>
              <p>Matchs diffusés</p>
            </div>
            <div className="stat-box">
              <h4>+ 10K</h4>
              <p>Fans inscrits</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhoUs;
