import React from "react";
import img from "../assets/about_img.png"; 
import appStore from "../assets/app-store.png";
import playStore from "../assets/play-store.png";
import "../styles/About.css";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-left">
        <img src={img} alt="FanZone fans illustration" />
      </div>

      <div className="about-details">
        <h3>Connecte-toi à la passion du football</h3>
        <h1>Bienvenue sur FanZone — là où les fans se rencontrent</h1>
        <p>
          Rejoins la communauté FanZone, l’espace dédié aux vrais passionnés ! 
          Suis les matchs, reçois les alertes, partage tes pronostics et vis 
          chaque instant comme si tu étais au stade.  
          Télécharge l’application dès maintenant et découvre une expérience 
          unique, pensée pour les supporters du monde entier.
        </p>

        <div className="store-buttons">
          <img src={appStore} alt="Download on App Store" />
          <img src={playStore} alt="Get it on Google Play" />
        </div>
      </div>
    </section>
  );
};

export default About;
