import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/AdminContent.css'
import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
import { API_URL } from "../../api/api";

const AdminContent = () => {
  const [users, setUsers] = useState([]);
  const [fans, setFans] = useState([]);
  const [agents, setAgents] = useState([]);
  const [zones, setZones] = useState([]);
  const [latestUsers, setLatestUsers] = useState([]);
const [admins,setAdmins]=useState([])




  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const userRes = await axios.get(`${API_URL}/api/show-fans`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const allUsers = userRes.data;

        setUsers(allUsers);
        setFans(allUsers.filter((u) => u.roles.includes("fan")));
        setAgents(allUsers.filter((u) => u.roles.includes("agent")));
        setAdmins(allUsers.filter((u)=>u.roles.includes('admin')))

        const latest = [...allUsers]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);
        setLatestUsers(latest);

        const zoneRes = await axios.get(`${API_URL}/api/show-zones`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const latest_zones = [...zoneRes.data.data]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);

        setZones(latest_zones);

      } catch (error) {
        console.error("Erreur de récupération:", error);
      } 
    };

    fetchData();
  }, []);

  const getRoleColor = (role) => {
    if (role.includes('fan')) return '#10b981';
    if (role.includes('agent')) return '#3b82f6';
    return '#6b7280';
  };


  const roleData = [
  { name: 'Fans', count: fans.length },
  { name: 'Agents', count: agents.length },
  { name: 'admin', count: admins.length},
];


  return (
    <main className='admin-content'>
      <h1>Dashboard Admin</h1>
      
    
      <div className="cards-container">
        <div className="card">
          <h2>Total Utilisateurs</h2>
          <p className="total-number">{users.length}</p>
        </div>

<div className="card">
          <h2>Total Admins</h2>
          <p className="total-number">{admins.length}</p>
        </div>
        <div className="card">
          <h2>Total Fans</h2>
          <p className="total-number">{fans.length}</p>
        </div>

        <div className="card">
          <h2>Total Agents</h2>
          <p className="total-number">{agents.length}</p>
        </div>
        
      </div>




  <BarChart style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }} responsive data={roleData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis width="auto" />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="#0c8e37" />
  </BarChart>

 





      <h2 className="section-title">5 Derniers Utilisateurs Inscrits</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {latestUsers.map((u, i) => (
              <tr key={i}>
                <td>{u.first_name}</td>
                <td>{u.last_name}</td>
                <td>{u.email}</td>
                <td style={{ color: getRoleColor(u.roles) }}>
                  {u.roles}
                </td>
                <td>{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <h2 className="section-title">5 Dernières Zones Créées</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Ville</th>
              <th>Date création</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((zone, i) => (
              <tr key={i}>
                <td>{zone.name}</td>
                <td>{zone.city}</td>
                <td>{new Date(zone.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   
      
    </main>
  );
};

export default AdminContent;