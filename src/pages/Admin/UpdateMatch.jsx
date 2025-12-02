import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/UpdateMatch.css';
import Swal from 'sweetalert2';
import { API_URL } from '../../api/api';
const UpdateMatch = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
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

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_URL}/api/match-details/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const match = response.data;
        setFormData({
          team_one_title: match.team_one_title || '',
          team_one_image: match.team_one_image || '',
          team_two_title: match.team_two_title || '',
          team_two_image: match.team_two_image || '',
          match_date: match.match_date ? match.match_date.slice(0, 16) : '',
          stadium: match.stadium || '',
          description: match.description || ''
        });
        
      } catch (error) {
        console.error("Erreur lors du chargement du match:", error);
        alert("Erreur lors du chargement du match");
      } 
    };

    fetchMatch();
  }, [id]);


  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API_URL}/api/match/${id}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
  title: "Match modifié avec succès!",
  icon: "success"
});
      navigate('/admin/matches');
      
    } catch (error) {
      console.error("Erreur lors de la modification du match:", error);
      alert("Erreur lors de la modification du match");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="update-match-container">
      <div className="update-match-header">
        <h1>Modifier le Match</h1>
        <button 
          onClick={() => navigate('/admin/matches')} 
          className="back-btn"
        >
          ← Retour
        </button>
      </div>

      <div className="update-match-card">
        <form onSubmit={handleSubmit} className="match-form">
          
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

          <div className="form-buttons">
        
            <button 
              type="submit" 
              className="submit-btn"
            >
              Modifier le Match
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMatch;