import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/AdminUpdateZone.css';
import Swal from 'sweetalert2';
import { API_URL } from '../../api/api';
const AdminUpdateZone = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [zone, setZone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchZone = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/zone-details/${id}`);
        setZone(res.data);
      } catch (error) {
        console.error('Erreur fetching zone details:', error);
        setMessage('Erreur lors du chargement de la zone');
      } finally {
        setLoading(false);
      }
    };

    fetchZone();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      
      const formData = {
        name: zone.name,
        city: zone.city,
        price: zone.price,
        capacity: zone.capacity,
        available_seats: zone.available_seats,
        address: zone.address || '',
        latitude: zone.latitude || '',
        longitude: zone.longitude || '',
        type: zone.type || '',
        description: zone.description || '',
        image: zone.image || ''
      };

      await axios.put(`${API_URL}/api/zone/${id}`, formData, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      Swal.fire({
  title: "Zone mise à jour avec succès !",
  icon: "success"
});
      setTimeout(() => {
        navigate('/admin/zones');
      }, 2000);

    } catch (error) {
      console.error('Erreur lors de la mise à jour de la zone:', error);
      setMessage('Erreur lors de la mise à jour de la zone');
    } 
  };


const handleChange = (e) => {
    const { name, value, type } = e.target;
    setZone(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement de la zone...</p>
      </div>
    );
  }

  if (!zone) {
    return (
      <div className="error-container">
        <p>Zone non trouvée</p>
        <button onClick={() => navigate('/admin/zones')} className="btn-primary">
          Retour à la liste
        </button>
      </div>
    );
  }

  return (
    <div className="update-zone-container">
      <div className="update-zone-header">
        <h1>Modifier la Zone</h1>
        <p>Mettez à jour les informations de la zone</p>
      </div>

      {message && (
        <div className={`message ${message.includes('succès') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="zone-form">
        <div className="form-grid">
          <div className="form-section">
            <h3>Informations de base</h3>
            <div className="input-group">
              <label htmlFor="name">Nom de la zone *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={zone.name || ''}
                onChange={handleChange}
                required
                placeholder="Entrez le nom de la zone"
              />
            </div>

            <div className="input-group">
              <label htmlFor="city">Ville *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={zone.city || ''}
                onChange={handleChange}
                required
                placeholder="Entrez la ville"
              />
            </div>

            
          </div>

          <div className="form-section">
            <h3>Capacité et tarification</h3>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="capacity">Capacité totale *</label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={zone.capacity || ''}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="0"
                />
              </div>

              <div className="input-group">
                <label htmlFor="available_seats">Places disponibles *</label>
                <input
                  type="number"
                  id="available_seats"
                  name="available_seats"
                  value={zone.available_seats || ''}
                  onChange={handleChange}
                  required
                  min="0"
                  max={zone.capacity || 0}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="price">Prix (MAD) *</label>
              <div className="price-input">
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={zone.price || ''}
                  onChange={handleChange}
                  required
                  min="0"
                  
                  placeholder="0.00"
                />
                <span className="currency">MAD</span>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Localisation</h3>
            <div className="input-group">
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                id="address"
                name="address"
                value={zone.address || ''}
                onChange={handleChange}
                placeholder="Entrez l'adresse complète"
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="latitude">Latitude</label>
                <input
                  type="number"
                  id="latitude"
                  name="latitude"
                  value={zone.latitude || ''}
                  onChange={handleChange}
                
                  placeholder="34.020882"
                />
              </div>

              <div className="input-group">
                <label htmlFor="longitude">Longitude</label>
                <input
                  type="number"
                  id="longitude"
                  name="longitude"
                  value={zone.longitude || ''}
                  onChange={handleChange}
                 
                  placeholder="-6.841650"
                />
              </div>
            </div>
          </div>

          <div className="form-section full-width">
            <h3>Description</h3>
            <div className="input-group">
              <label htmlFor="description">Description de la zone</label>
              <textarea
                id="description"
                name="description"
                value={zone.description || ''}
                onChange={handleChange}
                rows="4"
                placeholder="Décrivez cette zone (équipements, avantages, etc.)"
              />
            </div>
          </div>

          <div className="form-section full-width">
            <h3>Image</h3>
            <div className="input-group">
              <label htmlFor="image">URL de l'image</label>
              <input
                type="text"
                id="image"
                name="image"
                value={zone.image || ''}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {zone.image && (
              <div className="image-preview">
                <img  src={`${API_URL}/storage/${zone.image}`} />
                <span>Aperçu de l'image actuelle</span>
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/zones')}
            className="btn-secondary"
           
          >
            Annuler
          </button>
          <button
            type="submit"
            className="btn-primary"
           
          >
            Mettre à jour la zone
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUpdateZone;