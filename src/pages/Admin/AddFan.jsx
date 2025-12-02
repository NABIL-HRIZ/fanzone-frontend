import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/AddUser.css'
import Swal from 'sweetalert2';
import { API_URL } from '../../api/api';

const AddFan = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    role: 'fan' 
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
   
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/api/add-fan`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await Swal.fire({
  title: "User ajouté avec succès!",
  icon: "success"
});
      navigate('/admin/users'); 
      
    } catch (error) {
      console.error("Erreur lors de l'ajout du fan:", error);
      
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-fan-container">
      <div className="add-fan-header">
        <h1>Ajouter un Utilisateur</h1>
        <button 
          onClick={() => navigate('/admin/users')} 
          className="back-btn"
        >
          ← Retour à la liste
        </button>
      </div>

      <div className="add-fan-card">
        <div className="card-header">
          <h2>Informations de l'utilisateur</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="fan-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">Prénom *</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
               
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Nom *</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
               
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
               
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
               
                placeholder="06XXXXXXXX"
                maxLength="10"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role">Rôle *</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="fan">Fan</option>
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Mot de passe *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_confirmation">Confirmer le mot de passe *</label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
          
            <button 
              type="submit" 

              className="submit-btn"
            >
             Ajouter l'utilisateur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFan;