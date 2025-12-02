import React, { useEffect, useState } from "react";
import "../styles/MatchesHeroSection.css";
import heroImg from "../assets/hero.jpg"; 
import { FaTicketAlt, FaStreetView } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { API_URL } from "../api/api";
const MatchesHeroSection = () => {
  const [nextMatch, setNextMatch] = useState(null);
  const [loading, setLoading] = useState(true);




  useEffect(() => {
  const fetchNextMatch = async () => {
    try {
      const response  = await axios.get(`${API_URL}/api/show-matches`);
      const matches = response.data.data;

      const now = new Date();

      const upcoming = matches
        .filter(m => new Date(m.match_date) >= now)
        .sort((a, b) => new Date(a.match_date) - new Date(b.match_date));

      setNextMatch(upcoming[0] || null);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchNextMatch();
}, []);





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

      
      </div>

      <div className="hero-content">
        <div className="hero-text" style={{marginTop:"-150px"}}>
          

          <h1 className="hero-ttitle">
            <span className="ttitle-line">L'Émotion du</span>
            <span className="ttitle-accent">Football Marocain</span>
          </h1>

          <p className="hero-subttitle">
            Vivez l'intensité des plus grands matchs dans les stades du Maroc.
            Réservez votre place pour une expérience inoubliable.
          </p>

          <div className="feature-list alternative">
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
            <div className="next-match-card" style={{marginTop:"-160px"}}>
              <div className="carddd-header">
                <div className="mattch-badge">
                  Prochain Match
                </div>
                <div className="mattch-date">
                  {new Date(nextMatch.match_date).toLocaleString()}
                </div>
              </div>
              
              <div className="teams-section">
                <div className="team home-team">
                  <div className="team-logo">
                   
                      <img 
                       src={`${API_URL}/storage/${nextMatch.team_one_image}`}
                        alt={nextMatch.team_one_ttitle}
                      />
                  
                  </div>
                  <span className="team-name">{nextMatch.team_one_title}</span>
                </div>

                <div className="vs-section">
                  <div className="vss">VS</div>
                </div>

                <div className="team away-team">
                  <div className="team-logo">
                    
                      <img 
                        src={`${API_URL}/storage/${nextMatch.team_two_image}`}
                        alt={nextMatch.team_two_ttitle}
                      />
                    
                  </div>
                  <span className="team-name">{nextMatch.team_two_title}</span>
                </div>
              </div>

              <div className="match-details">
                <div className="stadium-info">
                  <span className="stadium-icon"><FaLocationDot /></span>
                  <span className="stadium-name">{nextMatch.stadium}</span>
                </div>
               
              </div>

              <div className="card-actions">
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
                            
                                <span> Zones Disponibles </span>
                             
                 </button>
              </div>
            </div>
          ) : (
            <div className="no-match-card">
              <h3>Aucun match disponible</h3>
              <p>Revenez plus tard pour les prochains matchs</p>
            </div>
          )}
        </div>
      </div>

      
    </div>
  );
};

export default MatchesHeroSection;