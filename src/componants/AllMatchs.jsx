import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AllMatchs.css';

const AllMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
const [totalMatches, setTotalMatches] = useState(0);
 
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 6; 

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/show-matches');
        setMatches(response.data.data);
     setTotalMatches(response.data.total);
       
      } catch (error) {
        console.error('Erreur lors de la récupération des matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('fr-FR', { month: 'short' }),
      time: date.toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  
  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);
  const totalPages = Math.ceil(matches.length / matchesPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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
      <div className="matches-header">
        <div className="header-content">
          <h1 className="section-title">
            <span className="title-text">Tous Les Matchs</span>
            <span className="title-underline"></span>
          </h1>
          <p className="section-subtitle">
            Découvrez tous les matchs à venir et réservez vos places
          </p>
        </div>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-number">{totalMatches}</span>
            <span className="stat-label">Matchs au total</span>
          </div>
        </div>
      </div>

      <div className="matches-grid">
        {currentMatches.map((match) => {
          const formattedDate = formatDate(match.match_date);

          return (
            <div key={match.id} className="match-card">
              <div className="card-header">
                <div className="match-date">
                  <span className="date-day">{formattedDate.day}</span>
                  <span className="date-month">{formattedDate.month}</span>
                </div>
                <div className="match-time">
                  <span className="time-icon">🕒</span>
                  {formattedDate.time}
                </div>
              </div>

              <div className="teams-section">
                <div className="team home-team">
                  <div className="team-logo">
                    {match.team_one_image ? (
                      <img
                        src={`http://127.0.0.1:8000/storage/${match.team_one_image}`}
                        alt={match.team_one_title}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="logo-fallback">
                      {match.team_one_title?.charAt(0)}
                    </div>
                  </div>
                  <span className="team-name">{match.team_one_title}</span>
                </div>

                <div className="vs-section">
                  <div className="vs-circle">VS</div>
                </div>

                <div className="team away-team">
                  <div className="team-logo">
                    {match.team_two_image ? (
                      <img
                        src={`http://127.0.0.1:8000/storage/${match.team_two_image}`}
                        alt={match.team_two_title}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="logo-fallback">
                      {match.team_two_title?.charAt(0)}
                    </div>
                  </div>
                  <span className="team-name">{match.team_two_title}</span>
                </div>
              </div>

              <div className="match-details">
                <div className="stadium-info">
                  <span className="stadium-icon">🏟️</span>
                  <span className="stadium-name">{match.stadium}</span>
                </div>
                {match.description && (
                  <p className="match-description">{match.description}</p>
                )}
              </div>

              <div className="card-actions">
                <button className="btn-primary">
                  Réserver Maintenant
                  <span className="btn-arrow" style={{ backgroundColor: 'transparent' }}>→</span>
                </button>
              </div>

              <div className="card-hover-effect"></div>
            </div>
          );
        })}
      </div>

      {matches.length > matchesPerPage && (
        <div className="pagination" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Précédent
          </button>
          <span>Page {currentPage} / {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Suivant
          </button>
        </div>
      )}

      {matches.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">⚽</div>
          <h3>Aucun match disponible</h3>
          <p>Revenez plus tard pour découvrir les prochains matchs</p>
        </div>
      )}
    </div>
  );
};

export default AllMatches;
