import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { FaTicketAlt, FaCalendar, FaMoneyBillWave, FaCheckCircle, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/ShowReservations.css';
import { IoIosPricetag } from "react-icons/io";
const ShowReservations = () => {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user) return;

      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/reservations/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReservations(res.data.data); 
      } catch (err) {
        setError('Erreur lors du chargement des réservations.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user]);



  const downloadTicket = (reservationId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Veuillez vous connecter pour télécharger le ticket');
    return;
  }

  (async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/download-ticket/${reservationId}`, {
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
      // If backend redirected to login (HTML), show a friendly message
      alert('Impossible de télécharger le ticket. Veuillez vous reconnecter et réessayer.');
    }
  })();
};




  if (loading) {
    return (
      <div className="reservations-loading">
        <div className="loading-spinner"></div>
        <p>Chargement de vos réservations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reservations-error">
        <div className="error-icon">⚠️</div>
        <h3>Une erreur est survenue</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Réessayer
        </button>
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="reservations-empty">
        <div className="empty-icon">
          <FaTicketAlt />
        </div>
        <h2>Aucune réservation trouvée</h2>
        <p>Vous n'avez pas encore de réservations. Réservez vos places pour vivre l'émotion du football !</p>
        <a href="/matches" className="explore-btn">
          Explorer les matchs
        </a>
      </div>
    );
  }

  return (
    <div className="reservations-container">
    
      <div className="reservations-header">
        <div className="header-content">
          <h1>Mes Réservations</h1>
          <p>Retrouvez toutes vos réservations et leurs détails</p>
        </div>
        <div className="reservations-stats">
          <div className="stat-item">
            <span className="stat-number">{reservations.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {reservations.filter(r => r.payment_status?.toLowerCase() === 'paid').length}
            </span>
            <span className="stat-label">Confirmées</span>
          </div>
        </div>
      </div>


     
      <div className="reservations-grid">
        {reservations.map((resv) => (
          <div key={resv.id} className="reservation-card">
            
            <div className="card-header">
              <div className="match-info">
                <h3>{resv.fan_zone?.match?.name || 'Match'}</h3>
                <div className="match-teams">
                  {resv.fan_zone?.match?.team_one_title && (
                    <>
                      <span className="team">{resv.fan_zone.match.team_one_title}</span>
                      <span className="vs">VS</span>
                      <span className="team">{resv.fan_zone.match.team_two_title}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="status-badge" style={{ backgroundColor: 'gren' }}>
              
                {resv.payment_status || 'En attente'}
              </div>
            </div>

            <div className="reservation-details">
              <div className="detail-row">
                <div className="detail-item">
                  <FaTicketAlt className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Zone</span>
                    <span className="detail-value">{resv.fan_zone?.name || 'Non spécifiée'}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <IoIosPricetag  className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Prix total</span>
                    <span className="detail-value price">{resv.total_price} DH</span>
                  </div>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <FaCalendar className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Date réservation</span>
                    <span className="detail-value">
                      {new Date(resv.reservation_date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon"><FaMoneyBillWave className='detail-icon' /></div>
                  <div className="detail-content">
                    <span className="detail-label">Nombre de tickets</span>
                    <span className="detail-value">{resv.number_of_tickets}</span>
                  </div>
                </div>
              </div>

             
              {resv.fan_zone?.match?.match_date && (
                <div className="match-details">
                  <div className="detail-item full-width">
                    <FaCalendar className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">Date du match</span>
                      <span className="detail-value">
                        {new Date(resv.fan_zone.match.match_date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                  {resv.fan_zone?.match?.stadium && (
                    <div className="detail-item full-width">
                      <FaMapMarkerAlt className="detail-icon" />
                      <div className="detail-content">
                        <span className="detail-label">Stade</span>
                        <span className="detail-value">{resv.fan_zone.match.stadium}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

           
            <div className="card-actions">
              
              <button className="btn-primary" onClick={() => downloadTicket(resv.id)}>
                Télécharger
              </button>
            </div>

           
           
          </div>
        ))}
      </div>

      {reservations.length === 0 && (
        <div className="filter-empty">
          <div className="empty-icon">🔍</div>
          <h3>Aucune réservation trouvée</h3>
          <p>Aucune réservation ne correspond à votre filtre actuel.</p>
          <button 
            onClick={() => setActiveFilter('all')} 
            className="clear-filter-btn"
          >
            Voir toutes les réservations
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowReservations;