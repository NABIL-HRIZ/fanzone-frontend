import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AllMatchs.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import '../styles/Button.css'
import { API_URL } from '../api/api';


const AllMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMatches, setTotalMatches] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [zones, setZones] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [zonesByMatch, setZonesByMatch] = useState([]);

 
  const fetchMatches = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/show-matches?page=${page}`);
      setMatches(response.data.data);
      setTotalMatches(response.data.total);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
    } catch (error) {
      console.error('Erreur lors de la récupération des matches:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

 
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const res = await axios.get('${API_URL}/api/show-zones');
        setZones(res.data.data);
      } catch (error) {
        console.log('Erreur lors de la récupération des zones', error);
      }
    };
    fetchZones();
  }, []);

  const openZonesModal = (matchId) => {
    const filtered = zones.filter((z) => z.matche_id === matchId);
    setZonesByMatch(filtered);
    console.log(zonesByMatch)
    setModalShow(true);
  };


  const ZonesModal = ({ show, onHide, zones }) => (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Zones Disponibles</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {zones.length === 0 ? (
          <p>Aucune zone disponible pour ce match.</p>
        ) : (
          <ul>
            {zones.map((zone) => (
              <>
                   <li key={zone.id} style={{display:'flex',alignItems:"center",gap:"25px",marginBottom:"10px"}}>
                <strong>{zone.name}</strong> — Places disponibles : {zone.available_seats}
                <Link to={`/zone/${zone.id}`} key={zone.id} style={{ textDecoration: "none" }}>
                
<button className='button'>
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
  <span>Réservé Maintenant</span>
</button>


                 </Link>
              </li>
            
              </>
         
            ))}
          </ul>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );

 
  const goToPage = (page) => {
    if (page >= 1 && page <= lastPage) {
      fetchMatches(page);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des matches...</p>
      </div>
    );
  }

  return (
    <div className="all-matches">
      <div className="mattches-header">
        <div className="header-content">
          <h1 className="section-title">
            <span className="title-text">Tous Les Matchs</span>
            <span className="title-underline"></span>
          </h1>
        </div>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-number">{totalMatches}</span>
            <span className="stat-label">Matchs au total</span>
          </div>
        </div>
      </div>

      <div className="matches-grid">
        {matches.length > 0 ? (
          matches.map((match) => (
            <div key={match.id} className="match-card">
              <div className="card-header">
                <div className="match-date">
                  <span className="date-day">
                    {new Date(match.match_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="mattch-time">
                  <span className="timme-icon">🕒</span>
                  <span className="mattch-time">
                    {new Date(match.match_date).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              <div className="teams-section">
                <div className="team home-team">
                  <div className="team-logo">
                    {match.team_one_image && (
                      <img
                        src={`${API_URL}/storage/${match.team_one_image}`}
                        alt={match.team_one_title}
                      />
                    )}
                  </div>
                  <span className="teamm-name">{match.team_one_title}</span>
                </div>

                <div className="vs-section">
                  <div className="vs-circle">VS</div>
                </div>

                <div className="team away-team">
                  <div className="team-logo">
                    {match.team_two_image && (
                      <img
                        src={`${API_URL}/storage/${match.team_two_image}`}
                        alt={match.team_two_title}
                      />
                    )}
                  </div>
                  <span className="teamm-name">{match.team_two_title}</span>
                </div>
              </div>

              <div className="match-details">
                <div className="stadium-info">
                  <span className="stadium-icon">🏟️</span>
                  <span className="stadiumm-name">{match.stadium}</span>
                </div>
                {match.description && (
                  <p className="match-description">{match.description}</p>
                )}
              </div>

              <div className="card-actions">
              

                <button className='button' onClick={() => openZonesModal(match.id)}>
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
                            
                                <span> Zones Disponibles </span>
                             
                 </button>
                
              </div>

              <div className="card-hover-effect"></div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <h3>Aucun match disponible</h3>
            <p>Revenez plus tard pour découvrir les prochains matchs</p>
          </div>
        )}
      </div>

      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)}>Précédent</button>
        <span>
          {currentPage} / {lastPage}
        </span>
        <button onClick={() => goToPage(currentPage + 1)}>Suivant</button>
      </div>

      {/* Modal */}
      <ZonesModal show={modalShow} onHide={() => setModalShow(false)} zones={zonesByMatch} />
    </div>
  );
};

export default AllMatches;
