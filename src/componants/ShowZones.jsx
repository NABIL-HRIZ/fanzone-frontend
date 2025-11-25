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
import { PiMoneyWavyBold } from "react-icons/pi";
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




  return (
    <div className="zones-container">
     
      <div className="headerr-content">
        <h1> Zones des Matchs du Maroc</h1>
        <p style={{marginBottom:"-40px"}}>Découvrez toutes les zones disponibles pour suivre et vivre les matchs de l’Équipe Nationale.</p>


      </div>
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
<span className="pricee-badge">{zone.price} MAD</span>
                </div>

                
                <div className='zone-hover-overlay'>
                  <div className="hover-content">
                    {zone.match ? (
                      <>
                        <div className="match-header">
                          <span className="live-badge">BIENTÔT EN DIRECT</span>
                         
                        </div>
                        
                        <div className="match-time">
                          <MdOutlineUpdate />
                          {new Date(zone.match.match_date).toLocaleString()}
                        </div>

                        <div className="teams-container">
                          <div className="team">
                            <div className="team-name">{zone.match.team_one_title}</div>
                          </div>
                          <div className="vss">VS</div>
                          <div className="team">
                            <div className="team-name">{zone.match.team_two_title}</div>
                          </div>
                        </div>

                      
                        <button className='button' style={{marginLeft:"40px"}}>
  <div class="svg-wrapper-1">
    <div class="svg-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path
          fill="currentColor"
          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
        ></path>
      </svg>
    </div>
  </div>
 <Link to={`/zone/${zone.id}`} key={zone.id} style={{ textDecoration: "none",color:"#000"}}>
                          <span>Réserver des billets</span>
                          </Link>
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