import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/AddMatch.css';

const AddMatch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    team_one_title: '',
    team_one_image: '',
    team_two_title: '',
    team_two_image: '',
    match_date: '',
    stadium: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  // Gérer les changements dans les inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/add-match",
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Match ajouté avec succès!');
      navigate('/admin/matches'); // Retourner à la liste des matchs
      
    } catch (error) {
      console.error("Erreur lors de l'ajout du match:", error);
      alert("Erreur lors de l'ajout du match");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-match-container">
      <div className="add-match-header">
        <h1>Ajouter un Match</h1>
        <button 
          onClick={() => navigate('/admin/matches')} 
          className="back-btn"
        >
          ← Retour
        </button>
      </div>

      <div className="add-match-card">
        <form onSubmit={handleSubmit} className="match-form">
          
          {/* Équipe 1 */}
          <div className="form-group">
            <label>Équipe 1 *</label>
            <input
              type="text"
              name="team_one_title"
              value={formData.team_one_title}
              onChange={handleChange}
              placeholder="Nom de l'équipe 1"
              required
            />
          </div>

          {/* Image Équipe 1 */}
          <div className="form-group">
            <label>Image Équipe 1</label>
            <input
              type="text"
              name="team_one_image"
              value={formData.team_one_image}
              onChange={handleChange}
              placeholder="URL de l'image (optionnel)"
            />
          </div>

          {/* Équipe 2 */}
          <div className="form-group">
            <label>Équipe 2 *</label>
            <input
              type="text"
              name="team_two_title"
              value={formData.team_two_title}
              onChange={handleChange}
              placeholder="Nom de l'équipe 2"
              required
            />
          </div>

          {/* Image Équipe 2 */}
          <div className="form-group">
            <label>Image Équipe 2</label>
            <input
              type="text"
              name="team_two_image"
              value={formData.team_two_image}
              onChange={handleChange}
              placeholder="URL de l'image (optionnel)"
            />
          </div>

          {/* Date du match */}
          <div className="form-group">
            <label>Date du Match *</label>
            <input
              type="datetime-local"
              name="match_date"
              value={formData.match_date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Stade */}
          <div className="form-group">
            <label>Stade</label>
            <input
              type="text"
              name="stadium"
              value={formData.stadium}
              onChange={handleChange}
              placeholder="Nom du stade (optionnel)"
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description du match (optionnel)"
              rows="4"
            />
          </div>

          {/* Boutons */}
          <div className="form-buttons">
            <button 
              type="button" 
              onClick={() => navigate('/admin/matches')}
              className="cancel-btn"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="submit-btn"
            >
              {loading ? 'Ajout en cours...' : 'Ajouter le Match'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMatch;