import React, { useEffect, useState } from "react";
import "../styles/MatchesHeroSection.css";
import heroImg from "../assets/hero.jpg"; 
import { FaTicketAlt, FaStreetView } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import axios from "axios";

const MatchesHeroSection = () => {
  const [nextMatch, setNextMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNextMatch = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/show-matches');
        const matches = response.data.data;
        
        if (matches && matches.length > 0) {
          const now = new Date();
          const upcomingMatches = matches
            .filter(match => new Date(match.match_date) > now)
            .sort((a, b) => new Date(a.match_date) - new Date(b.match_date));
          
          const closestMatch = upcomingMatches.length > 0 
            ? upcomingMatches[0] 
            : matches[matches.length - 1];
          
          setNextMatch(closestMatch);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNextMatch();
  }, []);

  const formatMatchDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return date.toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="matches-hero">
      <div className="hero-background">
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${heroImg})`,
          }}
        ></div>
        <div className="background-overlay"></div>

        <div className="modern-elements">
          <div className="grid-lines"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-text" style={{marginTop:"-150px"}}>
          

          <h1 className="hero-title">
            <span className="title-line">L'Émotion du</span>
            <span className="title-accent">Football Marocain</span>
          </h1>

          <p className="hero-subtitle">
            Vivez l'intensité des plus grands matchs dans les stades du Maroc.
            Réservez votre place pour une expérience inoubliable.
          </p>

          <div className="feature-list">
            <div className="feature">
              <span className="feature-icon">
                <FaTicketAlt />
              </span>
              <span>Réservation instantanée</span>
            </div>
            <div className="feature">
              <span className="feature-icon">
                <FaStreetView />
              </span>
              <span>Accès rapide</span>
            </div>
            <div className="feature">
              <span className="feature-icon">
                <MdOutlineSecurity />
              </span>
              <span>100% sécurisé</span>
            </div>
          </div>

         
        </div>

        <div className="hero-visual">
          {loading ? (
            <div className="loading-card">
              <div className="loading-spinner"></div>
              <p>Chargement du prochain match...</p>
            </div>
          ) : nextMatch ? (
            <div className="next-match-card" style={{marginTop:"-120px"}}>
              <div className="card-header">
                <div className="match-badge">
                  Prochain Match
                </div>
                <div className="match-date">
                  {formatMatchDate(nextMatch.match_date)}
                </div>
              </div>
              
              <div className="teams-section">
                <div className="team home-team">
                  <div className="team-logo">
                    {nextMatch.team_one_image ? (
                      <img 
                       src={`http://127.0.0.1:8000/storage/${nextMatch.team_one_image}`}
                        alt={nextMatch.team_one_title}
                      />
                    ) : (
                      <div className="logo-fallback">
                        {nextMatch.team_one_title?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="team-name">{nextMatch.team_one_title}</span>
                </div>

                <div className="vs-section">
                  <div className="vs-circle">VS</div>
                </div>

                <div className="team away-team">
                  <div className="team-logo">
                    {nextMatch.team_two_image ? (
                      <img 
                        src={`http://127.0.0.1:8000/storage/${nextMatch.team_two_image}`}
                        alt={nextMatch.team_two_title}
                      />
                    ) : (
                      <div className="logo-fallback">
                        {nextMatch.team_two_title?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="team-name">{nextMatch.team_two_title}</span>
                </div>
              </div>

              <div className="match-details">
                <div className="stadium-info">
                  <span className="stadium-icon">🏟️</span>
                  <span className="stadium-name">{nextMatch.stadium}</span>
                </div>
                {nextMatch.description && (
                  <p className="match-description">{nextMatch.description}</p>
                )}
              </div>

              <div className="card-actions">
                <button className="btn-reserve">
                  Réserver Maintenant
                  <span className="btn-arrow" style={{backgroundColor:'transparent'}}>→</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="no-match-card">
              <div className="no-match-icon">⚽</div>
              <h3>Aucun match disponible</h3>
              <p>Revenez plus tard pour les prochains matchs</p>
            </div>
          )}
        </div>
      </div>

      <div className="scroll-indicator-modern">
        <div className="scroll-line">
          <div className="scroll-progress"></div>
        </div>
        <span>Scroll pour découvrir</span>
      </div>
    </div>
  );
};

export default MatchesHeroSection;