import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ShowAllZones.css';
import { MdDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const ShowAllZones = () => {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchZones = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/show-zones?page=${page}`);

      setZones(res.data.data || []);
      setCurrentPage(res.data.current_page || 1);
      setLastPage(res.data.last_page || 1);

    } catch (err) {
      console.error('Erreur fetching zones:', err);
      setZones([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Pas de date";
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= lastPage) {
      fetchZones(page);
    }
  };

  if (loading) {
    return (
      <div className="all-zones-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des zones...</p>
      </div>
    );
  }

  return (
    <div className="all-zones-container">
      <div className="headerr-content">
        <h1>Toutes les Zones</h1>
        <p>Découvrez toutes les Fan Zones disponibles</p>
      </div>

      <div className="all-zones-grid">
        {zones.map(zone => (
          <Link to={`/zone/${zone.id}`} key={zone.id} style={{ textDecoration: "none" }}>
            <div className="zone-card">

              <div className="zone-imaage">
                <img
                  src={`http://127.0.0.1:8000/storage/${zone.image}`}
                  alt={zone.name}
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=500&q=80';
                  }}
                />
              </div>

              <div className="zone-content">
                <h3 className="zone-title">{zone.name}</h3>

                <div className="detail-item">
                  <span className="detail-icon"><MdDateRange /></span>
                  <span className="detail-value">
                    {zone.match ? formatDate(zone.match.match_date) : "Aucun match prévu"}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-icon"><IoLocationOutline /></span>
                  <span className="detail-value">{zone.city || "Adresse non fournie"}</span>
                </div>

              </div>

            </div>
          </Link>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Précédent
        </button>

        <span>{currentPage} / {lastPage}</span>

        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === lastPage}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ShowAllZones;
