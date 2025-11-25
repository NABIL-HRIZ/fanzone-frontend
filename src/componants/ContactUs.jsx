import React, { useState } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";
import "../styles/ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/contact",
        formData
      );

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Message envoyé avec succès !",
          iconColor: "#006233", 
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Erreur lors de l'envoi du message.",
        });
      }
    } catch (error) {
      console.error("Erreur serveur:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur serveur",
        text: "Erreur serveur, réessayez plus tard.",
      
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-us-container">
      <div className="contact-us-wrapper">
        <div className="contact-header">
          <h1 className="contact-title">Contactez-Nous</h1>
          <p className="contact-subtitle">
            Nous sommes là pour répondre à toutes vos questions. Envoyez-nous
            un message et nous vous répondrons dès que possible.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Votre nom complet"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Décrivez votre demande en détail..."
                  rows="6"
                  required
                />
              </div>

              <button
                type="submit"
                className='submitt-btn'
                
              >
              
                    Envoyer le message
              
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;