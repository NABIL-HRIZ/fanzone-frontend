import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import '../styles/MatchReservation.css';
import { FaLocationDot } from "react-icons/fa6";
import Swal from 'sweetalert2'
const MatchReservation = () => {
  const { id } = useParams();
  const [zone, setZone] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchZone = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/zone-details/${id}`);
        setZone(res.data);
      } catch (err) {
        console.error("Erreur récupération zone:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchZone();
  }, [id]);

  const handleAddToCart = () => {
    if (zone) {
      dispatch(addToCart({
        id: zone.id,
        name: zone.name,
        match_id: zone.matche_id,
        price: zone.price || 0,
        quantity: 1,
        image: zone.image,
        city: zone.city,
        available_seats: zone.available_seats
      }));
      Swal.fire({
  title: "Réservation Ajouted !",
  text: "Go check ur cart ",
  icon: "success"
});
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Chargement de la zone...</p>
    </div>
  );

  if (!zone) return (
    <div className="error-container">
      <p>Zone non trouvée.</p>
    </div>
  );

  return (
    <div className="reservation-page">
      <div className="reservation-header">
        <h1>Réserver votre place</h1>
        <p>Zone: {zone.name}</p>
      </div>

      <div className="reservation-content">
        <div className="zone-info">
          <div className="info-section">
            <h3>Informations de la zone</h3>
            <div className="info-grid">
                

              <div className="info-item">
                <span className="label">Ville:</span>
                <span className="value">{zone.city}</span>
              </div>
              <div className="info-item">
                <span className="label">Adresse:</span>
                <span className="value">{zone.address}</span>
              </div>
              <div className="info-item">
                <span className="label">Capacité disponible:</span>
                <span className="value">{zone.available_seats} places</span>
              </div>
              
              <div className="info-item price">
                <span className="label">Prix:</span>
                <span className="value">{zone.price ? `${zone.price} DH` : 'Gratuit'}</span>
              </div>
            </div>
          </div>

          
            <div className="description-section">
              <h3>Description</h3>
              <p>{zone.description}</p>
            </div>
          
 <div className="reservation-actions">
        <button onClick={handleAddToCart} className="add-cart-btn">
          <span  style={{backgroundColor:'transparent'}}>Ajouter au panier - {zone.price ? `${zone.price} DH` : 'Gratuit'}</span>
        </button>
      </div>
        
        </div>

        <div className="match-info">
          {zone.match && (
            <>
              <h3>Match concerné</h3>
              <div className="match-details">
                {zone.image && (
            <div className="image-section">
              <h3>Image de la zone</h3>
              <img  src={`http://localhost:8000/storage/${zone.image}`} alt={zone.name} className="zone-image" />
              
            </div>
          )}
                <div className="teams">
                  <span className="team">{zone.match.team_one_title}</span>
                  <span className="vs">VS</span>
                  <span className="team">{zone.match.team_two_title}</span>
                </div>
                {zone.match.match_date && (
                  <div className="match-date">
                    {new Date(zone.match.match_date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                )}
                {zone.match.stadium && (
                  <div className="stadium">
                    <span><FaLocationDot />  {zone.match.stadium}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
};

export default MatchReservation;