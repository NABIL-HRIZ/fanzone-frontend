import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ShowAllZones.css';
import { MdDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import ZoneSearch from './ZoneSearch';
import { API_URL } from '../api/api';
const ShowAllZones = () => {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchZones = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/show-zones?page=${page}`);

      setZones(res.data.data);
      setCurrentPage(res.data.current_page);
      setLastPage(res.data.last_page);

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

     

        <div className="zone-input search" style={{ position: 'relative', zIndex: 50 ,marginLeft:"600px"}}>
  <ZoneSearch />
</div>

      <div className="all-zones-grid">
        {zones.map(zone => (
          <Link to={`/zone/${zone.id}`} key={zone.id} style={{ textDecoration: "none" }}>
            <div className="zone-card">

              <div className="zone-imaage">
                <img
                  src={`${API_URL}/storage/${zone.image}`}
                  alt={zone.name}
                
                />
              </div>

              <div className="zone-content">
                <h3 className="zone-title">{zone.name}</h3>

                <div className="detail-item">
                  <span className="detail-icon"><MdDateRange /></span>
                  <span className="detail-value">
                    {new Date (zone.match.match_date).toLocaleString()}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-icon"><IoLocationOutline /></span>
                  <span className="detail-value">{zone.city}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-icon"><IoLocationOutline /></span>
                  <span className="detail-value">{zone.match.team_one_title} VC {zone.match.team_two_title}</span>
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
