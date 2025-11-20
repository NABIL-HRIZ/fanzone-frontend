import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CANState.css";

const CANStats = () => {
  const [teams, setTeams] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamsAndStats = async () => {
      try {
        const teamsRes = await axios.get(
          "https://v3.football.api-sports.io/teams",
          {
            params: { league: 6, season: 2023 },
            headers: { "x-apisports-key": "aa2c512655d911da09494ef58c1ee018" },
          }
        );

        const teamsData = teamsRes.data.response;
        setTeams(teamsData);

        const statsData = {};
        for (const t of teamsData) {
          const teamId = t.team.id;

          try {
            const statRes = await axios.get(
              "https://v3.football.api-sports.io/teams/statistics",
              {
                params: { team: teamId, league: 6, season: 2023 },
                headers: { "x-apisports-key": "aa2c512655d911da09494ef58c1ee018" },
              }
            );
            statsData[teamId] = statRes.data.response;
          } catch {
            statsData[teamId] = null;
          }
        }

        setStats(statsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchTeamsAndStats();
  }, []);



  if (loading) {
    return (
      <div className="can-stats-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des statistiques CAN 2023...</p>
      </div>
    );
  }

  return (
    <div className="can-stats">

      <div className="stats-header">
        <div className="header-content">
          <div className="tournament-badge">
            <span style={{backgroundColor:'transparent'}}>Les Statistiques de CAN 2023</span>
          </div>
          <h1 className="stats-title">
            Coupe d'Afrique <span className="title-highlight">des Nations</span>
          </h1>
          <p className="stats-subtitle">
            Statistiques détaillées de toutes les équipes participantes
          </p>
        </div>

        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">{teams.length}</span>
            <span className="stat-label">Équipes</span>
          </div>
        
        </div>
      </div>

      <div className="teamms-grid">
        {teams.map((team) => {
          const teamStats = stats[team.team.id];



          return (
            <div key={team.team.id} className="teamm-card">
              <div className="teamm-header">
                <div className="teamm-info">
                  <div className="teamm-logo">
                    <img src={team.team.logo} alt={team.team.name} />
                  </div>
                  <div className="teamm-details">
                    <h3 className="teamm-name">{team.team.name}</h3>
                    
                  </div>
                </div>

               
              </div>

              {teamStats ? (
                <div className="teamm-stats">

                  <div className="main-stats">
                    <div className="stat-row">
                      <div className="stat-item">
                        <span className="stat-value">
                          {teamStats.fixtures?.played?.total || 0}
                        </span>
                        <span className="stat-label">Matchs</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value wins">
                          {teamStats.fixtures?.wins?.total || 0}
                        </span>
                        <span className="stat-label">Victoires</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value draws">
                          {teamStats.fixtures?.draws?.total || 0}
                        </span>
                        <span className="stat-label">Nuls</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value losses">
                          {teamStats.fixtures?.loses?.total || 0}
                        </span>
                        <span className="stat-label">Défaites</span>
                      </div>
                    </div>
                  </div>

                  <div className="goals-section">
                    <div className="goals-stats">
                      <div className="goals-for">
                       
                        <div className="goals-info">
                          <span className="goals-label">Buts marqués</span>
                          <span className="goals-value">
                            {teamStats.goals?.for?.total?.total || 0}
                          </span>
                        </div>
                      </div>
                      <div className="goals-against">
                        
                        <div className="goals-info">
                          <span className="goals-label">Buts encaissés</span>
                          <span className="goals-value">
                            {teamStats.goals?.against?.total?.total || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                 
                </div>
              ) : (
                <div className="no-stats">
                  
                  <p>Statistiques non disponibles</p>
                </div>
              )}

              <div className="card-hover-effect"></div>
            </div>
          );
        })}
      </div>

      {teams.length === 0 && (
        <div className="empty-state">
          <h3>Aucune équipe trouvée</h3>
          <p>Impossible de charger les données des équipes</p>
        </div>
      )}
    </div>
  );
};

export default CANStats;
