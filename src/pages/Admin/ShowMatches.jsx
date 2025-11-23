import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/ShowMatches.css';
import { FaLocationDot } from "react-icons/fa6";

const ShowMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMatches,setTotalMatches]=useState(0)


  useEffect(() => {
  const fetchMatches = async () => {
    try {
      let allMatches = [];
      let page = 1;
      let lastPage = 1;

      do {
        const response = await axios.get(`http://127.0.0.1:8000/api/show-matches?page=${page}`);
        const data = response.data.data;
        allMatches = [...allMatches, ...data];
        lastPage = response.data.last_page ;
        page++;
      } while (page <= lastPage);

      setMatches(allMatches);
      setTotalMatches(allMatches.length);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement des matchs :", error);
      setLoading(false);
    }
  };

  fetchMatches();
}, []);


  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce match ?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://127.0.0.1:8000/api/match/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      setMatches(matches.filter(match => match.id !== id));
      alert('Match supprimé avec succès !');
      
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression du match");
    }
  };



  const getMatchStatus = (matchDate) => {
    const now = new Date();
    const matchDateTime = new Date(matchDate);
    
    if (matchDateTime > now) {
      return 'upcoming';
    } else {
      return 'completed';
    }
  };

  if (loading) {
    return (
      <div className="show-matches-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des matchs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="show-matches-container">
      <div className="show-matches-header">
        <h1>Gestion des Matchs</h1>
        <div className="header-stats">
          <div className="total-matches">
            <p>Nombre total de matchs</p>
            <div className="number">{totalMatches}</div>
          </div>
          <Link to="/admin/matches/add" className="add-match-btn">
            + Ajouter un Match
          </Link>
        </div>
      </div>

      <div className="matches-grid">
        {matches.map((match) => {
          const status = getMatchStatus(match.match_date);
          return (
            <div key={match.id} className="match-card">
              <div className="match-card-header">
                <div className={`match-status ${status}`}>
                  {status === 'upcoming' ? 'À venir' : 'Terminé'}
                </div>
                <div className="match-date">
                  {new Date(match.match_date).toLocaleDateString()}
                </div>
              </div>

              <div className="teams-section">
                <div className="team">
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
                  
                  </div>
                  <div className="team-name">{match.team_one_title}</div>
                </div>

                <div className="vs-separator">
                  <span>VS</span>
                </div>

                <div className="team">
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
                   
                  </div>
                  <div className="team-name">{match.team_two_title}</div>
                </div>
              </div>

              <div className="match-details">
                <div className="stadium-info">
                  <span className="stadium-icon"><FaLocationDot /></span>
                  {match.stadium || 'Stade non spécifié'}
                </div>
                
                {match.description && (
                  <div className="match-description">
                    {match.description}
                  </div>
                )}

                {match.zones && match.zones.length > 0 && (
                  <div className="zones-info">
                    <span className="zones-count">
                      {match.zones.length} zone(s) disponible(s)
                    </span>
                  </div>
                )}
              </div>

              <div className="match-actions">
                <Link 
                  to={`/admin/matches/edit/${match.id}`} 
                  className="edit-btn"
                >
                  Modifier
                </Link>
                <button 
                  onClick={() => handleDelete(match.id)} 
                  className="delete-btn"
                >
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>

      
    </div>
  );
};

export default ShowMatches;