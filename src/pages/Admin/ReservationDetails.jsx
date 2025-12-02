import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/ReservationDetails.css';
  import { FaPrint } from "react-icons/fa";
import { API_URL } from '../../api/api';

const ReservationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_URL}/api/reservations/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setReservation(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des détails de la réservation :", error);
        setLoading(false);
      }
    };

    fetchReservationDetails();
  }, [id]);


    const downloadTicket = (reservationId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Veuillez vous connecter pour télécharger le ticket');
      return;
    }
  
    (async () => {
      try {
        const response = await axios.get(`${API_URL}/api/download-ticket/${reservationId}`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob',
        });
  
        const blob = new Blob([response.data], { type: response.data.type || 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `ticket_${reservationId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error('Error downloading ticket:', err);
        alert('Impossible de télécharger le ticket. Veuillez vous reconnecter et réessayer.');
      }
    })();
  };


  if (loading) {
    return (
      <div className="reservation-details-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des détails de la réservation...</p>
        </div>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="reservation-details-container">
        <div className="error-container">
          <h2>Réservation non trouvée</h2>
          <button onClick={() => navigate('/admin/reservations')} className="back-btn">
            ← Retour aux réservations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-details-container">
    
      <div className="details-header">
        <div className="header-content">
          <h1>Détails de la Réservation</h1>
          <button onClick={() => navigate('/admin/reservations')} className="back-btn">
            ← Retour aux réservations
          </button>
        </div>
        <div className="reservation-id">
          Réservation #{reservation.id}
        </div>
      </div>

      <div className="details-content">
        <div className="details-grid">
          <div className="detail-cardd">
            <div className="cardd-header">
              <h3> Informations Utilisateur</h3>
            </div>
            <div className="cardd-content">
              <div className="info-item">
                <label>Nom complet:</label>
                <span>{reservation.user?.first_name} {reservation.user?.last_name}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{reservation.user?.email}</span>
              </div>
              <div className="info-item">
                <label>Téléphone:</label>
                <span>{reservation.user?.phone || 'Non renseigné'}</span>
              </div>
            </div>
          </div>

          <div className="detail-cardd">
            <div className="cardd-header">
              <h3> Informations Réservation</h3>
            </div>
            <div className="cardd-content">
              <div className="info-item">
                <label>Statut:</label>
                {reservation.payment_status}
              </div>
              <div className="info-item">
                <label>Nombre de billets:</label>
                <span className="tickets-count">{reservation.number_of_tickets}</span>
              </div>
              <div className="info-item">
                <label>Prix total:</label>
                <span className="price-amount">{reservation.total_price} MAD</span>
              </div>
              <div className="info-item">
                <label>Date de réservation:</label>
                <span>{new Date(reservation.reservation_date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="detail-cardd">
            <div className="cardd-header">
              <h3> Informations Zone</h3>
            </div>
            <div className="cardd-content">
              <div className="info-item">
                <label>Nom de la zone:</label>
                <span>{reservation.fan_zone?.name || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Ville:</label>
                <span>{reservation.fan_zone?.city || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Prix de la zone:</label>
                <span>{reservation.fan_zone?.price || 'N/A'} MAD</span>
              </div>
            </div>
          </div>

          <div className="detail-cardd">
            <div className="cardd-header">
              <h3> Informations Paiement</h3>
            </div>
            <div className="cardd-content">
              <div className="info-item">
                <label>ID Session Stripe:</label>
                <span className="code-text">{reservation.stripe_session_id || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>ID Paiement Stripe:</label>
                <span className="code-text">{reservation.stripe_payment_intent_id || 'N/A'}</span>
              </div>
             
              
            </div>
          </div>
        </div>

        <div className="actions-section">
          <div className="actions-cardd">
            <h3>Actions</h3>
            <div className="action-buttons">
             
            
            <button className="action-btn print-btn" onClick={() => downloadTicket(reservation.id)}>
  <FaPrint /> Imprimer
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;