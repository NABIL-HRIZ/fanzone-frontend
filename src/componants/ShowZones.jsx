import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import '../styles/ShowZones.css';
import { MdOutlineUpdate } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const ShowZones = () => {
  const [zones, setZones] = useState([]);
  const [activeZone, setActiveZone] = useState(null);

  const fetchZones = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/maroc-zones');
      setZones(response.data); 
    } catch (error) {
      console.error('Erreur lors de la récupération des zones:', error);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);


  const formatMatchDate = (dateString) => {
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="zones-container">
      {zones.length === 0 && (
        <div className="no-zones">
          <p>Aucune zone trouvée</p>
        </div>
      )}

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: -50,
          depth: 200,
          modifier: 1.5,
          slideShadows: false,
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true 
        }}
        modules={[EffectCoverflow, Pagination]}
        className="modern-swiper"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        {zones.map((zone) => (
          
          <SwiperSlide 
            key={zone.id}
            onMouseEnter={() => setActiveZone(zone.id)}
            onMouseLeave={() => setActiveZone(null)}
            className="zone-slide"
          >
            <Link to={`/zone/${zone.id}`} key={zone.id} style={{ textDecoration: "none" }}>
            <div className="zone-card">
              <div className="zone-image-container">
                <img
                  src={`http://localhost:8000/storage/${zone.image}`}
                  alt={zone.name}
                  className="zone-image"
                />
                
              
                <div className="zone-static-content">
                  <h3 className="zone-title">{zone.name}</h3>
                  <p className="zone-city"><FaLocationDot /> {zone.city}</p>
                </div>

                
                <div className='zone-hover-overlay'>
                  <div className="hover-content">
                    {zone.match ? (
                      <>
                        <div className="match-header">
                          <span className="live-badge">BIENTÔT EN DIRECT</span>
                          <h4 className="match-title">
                            {zone.match.team_one_title} VS {zone.match.team_two_title}
                          </h4>
                        </div>
                        
                        <div className="match-time">
                          <MdOutlineUpdate />
                          {formatMatchDate(zone.match.match_date)}
                        </div>

                        <div className="teams-container">
                          <div className="team">
                            <div className="team-name">{zone.match.team_one_title}</div>
                          </div>
                          <div className="vs">VS</div>
                          <div className="team">
                            <div className="team-name">{zone.match.team_two_title}</div>
                          </div>
                        </div>

                        <button className="book-button">
                          Réserver des billets
                          <FaAngleRight />
                        </button>
                      </>
                    ) : (
                      <div className="no-match">
                        <h4>Aucun match programmé</h4>
                        <p>Revenez plus tard pour les prochains matches</p>
                        <button className="book-button disabled">
                          Bientôt disponible
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            </Link>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShowZones;