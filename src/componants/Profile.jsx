import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../styles/Profile.css'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


const Profile = () => {
    const navigate=useNavigate()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
          'http://127.0.0.1:8000/api/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json"
            }
          }
        );

        setUser(response.data);

        setFormData({
          first_name: response.data.first_name || '',
          last_name: response.data.last_name || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          password: '',
          password_confirmation: ''
        });

      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
      const token = localStorage.getItem('token');

      const submitData = { ...formData };


      if (!submitData.password) {
        delete submitData.password;
        delete submitData.password_confirmation;
      }

      const response = await axios.put(
        'http://127.0.0.1:8000/api/profile',
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        }
      );

      setUser(response.data.user);

            await Swal.fire({
  title: "Profile bien modifié !",
  icon: "success"
});
   navigate('/')
     

    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <p>Erreur : utilisateur introuvable.</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Mon Profil</h1>
      
      </div>

      <div className="profile-card">

        <form onSubmit={handleSubmit} className="profile-form">

          <div className="card-header">
            <h2>Informations Personnelles</h2>
            <button type="submit" className="edit-btn">Modifier</button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Prénom *</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Nom *</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="06XXXXXXXX"
                maxLength="10"
              />
            </div>
          </div>

          <div className="password-section">
            <h3>Changer le mot de passe</h3>

            <div className="form-grid">
              <div className="form-group">
                <label>Nouveau mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="8"
                  placeholder="Minimum 8 caractères"
                />
              </div>

              <div className="form-group">
                <label>Confirmer</label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  placeholder="Confirmez votre mot de passe"
                />
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}

export default Profile;
