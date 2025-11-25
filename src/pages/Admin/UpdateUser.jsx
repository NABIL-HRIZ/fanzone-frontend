import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../styles/UpdateUser.css'


const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error,setError]=useState('')

 
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/fan-details/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = response.data.user ;
        setUser(userData);
        
        
        setFormData({
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          password: '', 
          password_confirmation: '',
          role:  userData.roles[0].name 
        });
        
      } catch (error) {
        console.error("Erreur lors du chargement des détails de l'utilisateur:", error);
        alert("Erreur lors du chargement des détails de l'utilisateur");
        setError(error)
      } 
    };

    fetchUserDetails();
  }, [id]);

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

    const submitData = { ...formData };

      if (!submitData.password) {
    delete submitData.password;
    delete submitData.password_confirmation;
  }
   

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://127.0.0.1:8000/api/fan/${id}`,
        submitData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await Swal.fire({
  title: "Utilisateur modifié avec succès!",
  icon: "success"
});
      navigate('/admin/users'); 
      
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur:", error);
    } 
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="update-user-container">
      <div className="update-user-header">
        <h1>Modifier l'Utilisateur</h1>
        <div className="header-actions">
          <button 
            onClick={() => navigate('/admin/users')} 
            className="back-btn"
          >
            ← Retour à la liste
          </button>
        </div>
      </div>

      <div className="update-user-card">
        <div className="card-header">
          <h2>
            Modification de {user.first_name} {user.last_name}
            
          </h2>
          <div className="user-info">
            <span className="user-email">{user?.email}</span>
            <span className="user-role-badge">{formData.role}</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-section">
            <h3>Informations personnelles</h3>
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
          </div>

          <div className="form-section">
            <h3>Changer le mot de passe</h3>
          
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Nouveau mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_confirmation">Confirmer le nouveau mot de passe</label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  placeholder="Laisser vide pour ne pas modifier"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
           
            <button 
              type="submit" 
              disabled={loading}
              className="submit-btn"
            >
              Modifier l'utilisateur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;