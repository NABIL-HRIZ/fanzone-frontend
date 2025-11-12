import React from "react";
import "../styles/WhoUs.css";
import fanImage from "../assets/who-us-pic.jpg"; 

const WhoUs = () => {
  return (
    <section className="who-us">
      <div className="who-us-container">
         <div className="who-us-image">
          <img src={fanImage} alt="Fans en célébration" />
        </div>
        <div className="who-us-content">
          <h2 className="who-us-title">Qui sommes-nous ?</h2>
          <h3 className="who-us-subtitle">
            La passion du football, partagée par tous les Marocains 🇲🇦
          </h3>
          <p className="who-us-description">
            <strong>Fan Zon</strong> est une plateforme dédiée à la{" "}
            <span>CAN Maroc 2025</span> qui rassemble tous les passionnés de
            football autour d’un seul objectif : <em>vivre l’émotion du jeu</em> ensemble.  
          </p>

          <p className="who-us-description">
            Notre mission est de connecter les supporters à travers des{" "}
            <strong>Fan Zones officielles</strong> dans tout le Maroc, où chaque
            match devient une fête. Réservez vos places, découvrez les
            événements locaux et vibrez au rythme des plus grands moments du
            football africain !
          </p>

          <div className="who-us-stats">
            <div className="stat-box">
              <h4>+ 20</h4>
              <p>Fan Zones actives</p>
            </div>
            <div className="stat-box">
              <h4>+ 50</h4>
              <p>Matchs diffusés</p>
            </div>
            <div className="stat-box">
              <h4>+ 10K</h4>
              <p>Fans inscrits</p>
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default WhoUs;
