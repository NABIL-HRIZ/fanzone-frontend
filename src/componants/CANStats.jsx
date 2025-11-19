import React, { useEffect, useState } from "react";
import axios from "axios";

const CANStats = () => {
  const [teams, setTeams] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamsAndStats = async () => {
      try {
        // Fetch teams
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

  if (loading) return <p>Loading teams and stats...</p>;

  return (
    <div>
      <h2>CAN 2023 – Teams & Statistics</h2>
      {teams.map((t) => {
        const s = stats[t.team.id];
        return (
          <div
            key={t.team.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h3>{t.team.name}</h3>
            <img src={t.team.logo} width={50} alt={t.team.name} />
            {s ? (
              <div>
                <p>
                  <strong>Played:</strong>{" "}
                  {s?.fixtures?.played?.total ?? "N/A"}
                </p>
                <p>
                  <strong>Wins:</strong>{" "}
                  {s?.fixtures?.wins?.total ?? "N/A"} |{" "}
                  <strong>Draws:</strong>{" "}
                  {s?.fixtures?.draws?.total ?? "N/A"} |{" "}
                  <strong>Losses:</strong>{" "}
                  {s?.fixtures?.loses?.total ?? "N/A"}
                </p>
                <p>
                  <strong>Goals For:</strong>{" "}
                  {s?.goals?.for?.total?.total ?? "N/A"} |{" "}
                  <strong>Goals Against:</strong>{" "}
                  {s?.goals?.against?.total?.total ?? "N/A"}
                </p>
              </div>
            ) : (
              <p>No stats available</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CANStats;
