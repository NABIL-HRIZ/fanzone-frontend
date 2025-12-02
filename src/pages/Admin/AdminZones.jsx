import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/AdminZones.css'
import Swal from 'sweetalert2';
import { API_URL } from '../../api/api';



const AdminZones = () => {
  const [zones, setZones] = useState([]);
  const [totalZones, setTotalZones] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllZones = async () => {
      try {
        let allZones = [];
        let page = 1;
        let lastPage = 1;

        while (page <= lastPage) {
          const response = await axios.get(`${API_URL}/api/show-zones?page=${page}`);
          allZones = [...allZones, ...response.data.data];
          lastPage = response.data.last_page;
          page++;
        }

        setZones(allZones);
        setTotalZones(allZones.length);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllZones();
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
          `${API_URL}/api/zone/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        
        setZones(prev => prev.filter(zone => zone.id !== id));

        Swal.fire({
          title: "Supprimé !",
          text: "La zone  a été supprimé avec succès.",
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


  const getAvailabilityClass = (available, capacity) => {
    const percentage = (available / capacity) * 100;
    if (percentage >= 50) return 'high';
    if (percentage >= 20) return 'medium';
    return 'low';
  };

  return (
    <div className="admin-zones-container">
      <div className="admin-zones-header" style={{marginRight:"50px"}}>
        <h1>Gestion des Zones</h1>
        <div className="header-stats">
          <div className="total-zones">
            <p>Nombre total de zones</p>
            <div className="number">{totalZones}</div>
          </div>
          <Link to="/admin/zones/add" className="add-zone-btn">
            + Ajouter une Zone
          </Link>
        </div>
      </div>

      <div className="zones-table-container">
        <table className="zones-table">
          <thead>
            <tr>
              <th>Zones image</th>
              <th>Nom</th>
              <th>Ville</th>
              <th>Prix</th>
              <th>Capacité</th>
              <th>Places disponibles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {zones.map(zone => {
                const availabilityClass = getAvailabilityClass(zone.available_seats, zone.capacity);
              return (
                <tr key={zone.id}>
                  <td>
                    <img src={`${API_URL}/storage/${zone.image}`} alt="" style={{width:'50px',height:"50px"}} />
                  </td>
                  <td>
                    <strong>{zone.name}</strong>
                  </td>
                  <td>{zone.city}</td>
                  <td>
                    <span className="price-tag">{zone.price} MAD</span>
                  </td>
                  <td>{zone.capacity}</td>
                  <td>
                    <div className={`available-seats ${availabilityClass}`}>
                      {zone.available_seats}
                      <div className={`availability-badge ${availabilityClass}`}>
                        {availabilityClass === 'high' ? 'Élevée' : 
                         availabilityClass === 'medium' ? 'Moyenne' : 'Faible'}
                      </div>
                    </div>
                  </td>
                 
                  <td className="actions-cell">
                    <Link 
                      to={`/admin/zones/edit/${zone.id}`} 
                      className="editt-btn"
                    >
                      Modifier
                    </Link>
                    <button 
                      onClick={() => handleDelete(zone.id)} 
                      className="delete-btn"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {zones.length === 0 && (
          <div className="empty-state">
            <p>Aucune zone trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminZones;