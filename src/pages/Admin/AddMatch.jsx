import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/AddMatch.css';
import Swal from 'sweetalert2';
import { API_URL } from '../../api/api';

const AddMatch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    team_one_title: '',
    team_one_image: null,
    team_two_title: '',
    team_two_image: null,
    match_date: '',
    stadium: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({
        ...formData,
        [name]: files[0] || null
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const form = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          form.append(key, formData[key]);
        }
      }

     
      const response = await axios.post(
        `${API_URL}/api/add-match`,
        form,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        }
      );

      if (response.data) {
        await Swal.fire({
          icon: "success",
          title: "Match ajouté",
          text: "Le match a été ajouté avec succès !",
        });
        navigate("/admin/matches");
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur !",
        text: error.response?.data?.message || "Erreur lors de l'ajout du match.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-match-container">
      <div className="add-match-header">
        <h1>Ajouter un Match</h1>
        <button onClick={() => navigate('/admin/matches')} className="back-btn">
          ← Retour
        </button>
      </div>

      <div className="add-match-card">
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
              type="file"
              accept="image/*"
              name="team_one_image"
              onChange={handleChange}
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
              type="file"
              accept="image/*"
              name="team_two_image"
              onChange={handleChange}
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
            <button type="submit" className="submit-btn" >
             Ajouter le Match
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMatch;
