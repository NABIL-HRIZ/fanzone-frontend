import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ShowFans.css';
import Swal from 'sweetalert2';

const ShowFans = () => {
  const [fans, setFans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFans = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://127.0.0.1:8000/api/show-fans",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFans(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des fans :", error);
        setLoading(false);
      }
    };

    fetchFans();
  }, []);

 


  const handleDelete = async (id) => {
  Swal.fire({
    title: "Êtes-vous sûr ?",
    text: "Cette action est irréversible !",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Oui, supprimer",
    cancelButtonText: "Annuler"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");

        await axios.delete(
          `http://127.0.0.1:8000/api/fan/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

     
        setFans(prev => prev.filter(fan => fan.id !== id));

        Swal.fire({
          title: "Supprimé !",
          text: "Le utilisateur a été supprimé avec succès.",
          icon: "success"
        });

      } catch (error) {
        console.error("Erreur lors de la suppression :", error);

        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Une erreur s'est produite lors de la suppression.",
        });
      }
    }
  });
};



  if (loading) {
    return <div className="loading-container">Chargement...</div>;
  }

    const getRoleColor = (role) => {
    if (role.includes('fan')) return '#10b981';
    if (role.includes('agent')) return '#3b82f6';
    return '#6b7280';
  };




  return (
    <div className="show-fans-container">
      <div className="show-fans-header">
        <h1>Gestion des Fans</h1>
        <div className="header-stats">
          <div className="total-fans">
            <p>Nombre total de fans</p>
            <div className="number">{fans.length}</div>
          </div>
          <Link to="/admin/users/add" className="add-fan-btn">
            + Ajouter un Fan
          </Link>
        </div>
      </div>

      <div className="fans-table-container">
        <table className="fans-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Prénom</th>
              
              <th>Email</th>
              <th>Téléphone</th>
               <th>role</th>
              <th>Date de création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fans.map((fan) => (
              <tr key={fan.id}>
                <td>
                  <strong>#{fan.id}</strong>
                </td>
                
                <td>{fan.first_name}</td>
                <td>{fan.email}</td>
                <td>{fan.phone || 'N/A'}</td>
               <td style={{ color: getRoleColor(fan.roles) }}>
                  {fan.roles}
                </td>
                <td>{new Date(fan.created_at).toLocaleDateString('fr-FR')}</td>
                <td className="actions-cell">
                  <Link 
                    to={`/admin/users/edit/${fan.id}`} 
                    className="editt-btn"
                  >
                    Modifier
                  </Link>
                  <button 
                    onClick={() => handleDelete(fan.id)} 
                    className="delete-btn"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {fans.length === 0 && (
          <div className="empty-state">
            <p>Aucun fan trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowFans;