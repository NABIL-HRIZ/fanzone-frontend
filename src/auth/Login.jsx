import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();



  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", formData);


 const userData = response.data.user;
const token = response.data.token;
const roles = response.data.role; 

localStorage.setItem("user", JSON.stringify(userData));
localStorage.setItem("token", token);
localStorage.setItem("roles", JSON.stringify(roles));

setUser({
  ...userData,
  role: roles[0] || null
});

if (roles.includes("admin")) {
  navigate("/admin");
} else if (roles.includes("agent")) { 
  navigate("/");
} else {
  navigate("/");
}
    } catch (error) {
      
        setErrors({ error: "Une erreur est survenue. Veuillez réessayer." });
      
    } finally {
      setIsLoading(false);
    }
  };




  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Content de vous revoir !</h2>
          <p>Connectez-vous à votre compte FANZONE</p>
        </div>

        {errors.error && <div className="error-message">{errors.error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
              placeholder="votre@email.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
              placeholder="Votre mot de passe"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-options">
            
            <a href="/forgot-password" className="forgot-password">Mot de passe oublié ?</a>
          </div>

          <button className='button' style={{marginLeft:"70px"}}>
  <div class="svg-wrapper-1">
    <div class="svg-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path
          fill="currentColor"
          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
        ></path>
      </svg>
    </div>
  </div>
  <span>Se Connecter</span>
           </button>
        </form>

        <div className="login-footer">
          <p>Pas encore de compte ? <Link to="/register">S'inscrire</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;