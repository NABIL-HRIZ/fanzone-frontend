import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ZoneDetail.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaMapMarkerAlt, FaUsers, FaChair, FaCalendar, FaClock, FaMap, FaArrowLeft } from 'react-icons/fa';

const ZoneDetail = () => {
  const [zone, setZone] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    const fetchZone = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/zone-details/${id}`);
        setZone(res.data);
      } catch (error) {
        console.error("Erreur de récupération zone:", error);
      }
    };

    fetchZone();
  }, [id]);

  if (!zone)
    return (
      <div className="all-zones-loading">
        <div className="loading-spinner"></div>
        <p>Chargement de la zone...</p>
      </div>
    );

  const calculateOccupancy = () => {
    if (!zone.capacity || !zone.available_seats) return 0;
    return ((zone.capacity - zone.available_seats) / zone.capacity) * 100;
  };

  const getOccupancyStatus = () => {
    const occupancy = calculateOccupancy();
    if (occupancy >= 90) return { text: "Presque complet", class: "status-full" };
    if (occupancy >= 70) return { text: "Places limitées", class: "status-limited" };
    return { text: "Places disponibles", class: "status-available" };
  };

  const occupancyStatus = getOccupancyStatus();

  return (
    <>
      <div
        className="zonee-detail"
        style={{
          background: `url(http://127.0.0.1:8000/storage/${zone.image}) no-repeat center / cover`
        }}
      >
        <div className="zonee-detail__overlay" />

        <div className="zonee-detail__content">
          <div className="zonee-img" data-aos="fade-right">
            <img src={`http://127.0.0.1:8000/storage/${zone.image}`} alt={zone.name} />
          </div>

          <div className="zonee-infos" data-aos="fade-left">
            <h2 className="zonee-title">
              {zone.name}
              <span className="city"> – {zone.city}</span>
            </h2>

            <div className="meta">
              <span className="genre-pill">{zone.city}</span>
              {zone.match && (
                <div className="match-badge">
                  <FaClock className="icon" /> 
                  {zone.match.team_one_title} vs {zone.match.team_two_title}
                </div>
              )}
            </div>

            <div className="details-grid">
              <div className="detail-card" data-aos="zoom-in">
                <h4><FaMapMarkerAlt className="icon" /> Adresse</h4>
                <p><strong>Localisation:</strong> {zone.address || "Non spécifiée"}</p>
                <p><strong>Ville:</strong> {zone.city}</p>
                {zone.latitude && zone.longitude && (
                  <div className="map-section">
                    <a 
                      href={`https://www.google.com/maps?q=${zone.latitude},${zone.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-link"
                      style={{backgroundColor:"transparent"}}
                    >
                      <FaMap className="icon" /> Voir sur Google Maps
                    </a>
                  </div>
                )}
              </div>

              <div className="detail-card" data-aos="zoom-in" data-aos-delay="100">
                <h4><FaUsers className="icon" /> Capacité</h4>
                <p><strong>Capacité totale:</strong> {zone.capacity} places</p>
                <p><strong>Places disponibles:</strong> {zone.available_seats} places</p>
                <div className="capacity-info">
                  <div className="capacity-bar">
                    <div 
                      className="capacity-fill" 
                      style={{ width: `${calculateOccupancy()}%` }}
                    ></div>
                  </div>
                  <span className={`capacity-text ${occupancyStatus.class}`}>
                    {occupancyStatus.text}
                  </span>
                </div>
              </div>

              <div className="detail-card" data-aos="zoom-in" data-aos-delay="200">
                <h4><FaCalendar className="icon" /> Informations Match</h4>
                {zone.match ? (
                  <>
                    <p><strong>Équipe 1:</strong> {zone.match.team_one_title}</p>
                    <p><strong>Équipe 2:</strong> {zone.match.team_two_title}</p>
                    <p><strong>Date du match:</strong> {new Date(zone.match.match_date).toLocaleDateString('fr-FR')}</p>
                    <p><strong>Heure:</strong> {new Date(zone.match.match_date).toLocaleTimeString('fr-FR')}</p>
                  </>
                ) : (
                  <p>Aucun match programmé pour le moment</p>
                )}
              </div>

              <div className="detail-card" data-aos="zoom-in" data-aos-delay="300">
                <h4><FaChair className="icon" /> Détails Techniques</h4>
                <p><strong>ID de la zone:</strong> {zone.id}</p>
                <p><strong>ID du match:</strong> {zone.matche_id || "Non assigné"}</p>
                <p><strong>Créée le:</strong> {new Date(zone.created_at).toLocaleDateString('fr-FR')}</p>
                <p><strong>Dernière mise à jour:</strong> {new Date(zone.updated_at).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>

            <h4 className="section-label" style={{backgroundColor:"transparent"}}>Description</h4>
            <div className="synopsis-card"  data-aos="fade-up">
              <p style={{backgroundColor:"transparent"}}> {zone.description || "Aucune description disponible pour cette Fan zonee."}</p>
            </div>

            <div className="action-buttons" style={{backgroundColor:"transparent"}}>
              <Link to="/" className="action-btn secondary-btn">
                <FaArrowLeft className="icon" /> Retour aux zonees
              </Link>
              <Link to={`/reservation/${zone.id}`} className="action-btn primary-btn">
                Réserver maintenant
              </Link>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default ZoneDetail;