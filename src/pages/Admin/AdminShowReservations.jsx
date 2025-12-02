import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiMoneyBill } from "react-icons/ci";
import { FaDatabase } from "react-icons/fa";
import '../../styles/AdminShowReservations.css'
import { Link } from 'react-router-dom';
import { API_URL } from '../../api/api';

const AdminShowReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const response = await axios.get(
          `${API_URL}/api/reservations`, 
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

      
        setReservations(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des réservations :", error);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

 const totalRevenue = reservations.reduce(
  (sum, r) => sum + Number(r.total_price || 0),
  0
);

const totalTicketPayed = reservations.filter(r => r.payment_status === "paid").length;


  if (loading) {
    return (
      <div className="admin-reservations-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des réservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-reservations-container">
      <div className="admin-reservations-header">
        <h1>Gestion des Réservations</h1>
        <div className="stats-reservation-cards">
          <div className="state-reservation-card">
            <div className="stat-reservation-icon"><FaDatabase /></div>
            <div className="stat-reservation-info">
              <h3>{reservations.length}</h3>
              <p>Total Réservations</p>
            </div>
          </div>

          <div className="state-reservation-card">
            <div className="stat-reservation-icon"><CiMoneyBill /></div>
            <div className="stat-reservation-info">
            <h3>{totalTicketPayed}</h3>
              <p>Total Les tickets tba3at</p>
            </div>
          </div>


          <div className="state-reservation-card">
            <div className="stat-reservation-icon"><CiMoneyBill /></div>
            <div className="stat-reservation-info">
            <h3>{totalRevenue.toFixed(2)} MAD</h3>
              <p>Chiffre d'Affaires</p>
            </div>
          </div>

          
        </div>
      </div>

      <div className="reservations-table-container">
        <div className="table-header">
          <h2>Liste des Réservations</h2>
          <div className="table-actions">
            <span className="results-count">
              {reservations.length} réservation(s) trouvée(s)
            </span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="reservations-table">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Zone</th>
                <th>Billets</th>
                <th>Prix Total</th>
                <th>Statut Paiement</th>
                <th>Date Réservation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                 
                  <td>
                    <div className="user-info">
                      <div className="user-name">
                        {reservation.user?.first_name} {reservation.user?.last_name}
                      </div>
                      
                    </div>
                  </td>
                  <td>
                    {reservation.fan_zone?.name}
                  </td>
                  <td>
                    <span className="tickets-count">
                      {reservation.number_of_tickets}
                    </span>
                  </td>
                  <td>
                    <span className="price-amount">
                      {reservation.total_price} MAD
                    </span>
                  </td>
                  <td>
                    {reservation.payment_status}
                  </td>
                  <td>
                    {new Date(reservation.reservation_date).toLocaleDateString()}
                  </td>
                  <td className="actions-cell">
                    <button className="view-btn">
                        <Link to={`/admin/reservation/${reservation.id}`} style={{color:'#fff',textDecoration:"none"}} >
                      Voir Détails
                      </Link>
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
      </div>
    </div>
  );
};

export default AdminShowReservations;