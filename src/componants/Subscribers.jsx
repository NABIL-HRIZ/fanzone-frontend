import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Subscribe.css';
import Swal from 'sweetalert2'
const Subscibes = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/add-email', { email });
      setMessage(response.data.message); 
      Swal.fire({
  title: "Email Envoyée !",
  icon: "success"
});
      setEmail('');
    } catch (error) {
      console.error(error);
      Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Email déja enregistrer ",
  
});
    }
  };

  return (
    <section className="subscribe-section">
      <div className="subscribe-container">
        <div className="subscribe-content">
          <h3 className="subscribe-title">Restez connectés à la CAN 2025!</h3>
          <p className="subscribe-description">
            Soyez le premier à recevoir les infos sur les Fan Zones, les matchs, les événements spéciaux et toutes les dernières actualités du football marocain. 
            Tout cela directement dans votre boîte de réception !
          </p>
          
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre adresse email"
                className="email-input"
                required
              />
              <button type="submit" className="subscribe-btn">
                S'inscrire
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Subscibes;
