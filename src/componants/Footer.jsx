import React from 'react';
import '../styles/Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import appstore from '../assets/app-store.png'
import playstore from '../assets/play-store.png'

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        <div className="footer-content">

         
          <div className="footer-column">
            <div className="brand-section">
              <h3 className="brand-title">Fan Zon</h3>
              <p className="brand-description">
                <strong>Fan Zon</strong> est la plateforme officielle des supporters pour la 
                <span> CAN Maroc 2025</span>. Elle réunit les passionnés de football africain 
                dans des <strong>Fan Zones</strong> à travers tout le Maroc pour vivre 
                ensemble chaque moment fort du tournoi !
              </p>
            </div>

            <div className="social-links">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>

         
          <div className="footer-column">
            <h4 className="column-title">Explorer</h4>
            <ul className="footer-links">
              <li><a href="/matches" className="footer-link">Matchs</a></li>
              <li><a href="/zones" className="footer-link">Fan Zones</a></li>
              <li><a href="/boutique" className="footer-link">Boutique</a></li>
              <li><a href="/news" className="footer-link">Actualités</a></li>
            </ul>
          </div>

          
          <div className="footer-column">
            <h4 className="column-title">Fan Zon</h4>
            <ul className="footer-links">
              <li><a href="/qui-sommes-nous" className="footer-link">Qui sommes-nous ?</a></li>
              <li><a href="/contact" className="footer-link">Contactez-nous</a></li>
              <li><a href="/faq" className="footer-link">F.A.Q</a></li>
              <li><a href="/politique" className="footer-link">Politique de confidentialité</a></li>
            </ul>
          </div>

          
          <div className="footer-column">
            <h4 className="column-title">Téléchargez l'application</h4>
            <div className="app-links">
              <img src={playstore} alt="Télécharger sur Google Play" />
              <img src={appstore} alt="Télécharger sur App Store" />
            </div>
          </div>

        </div>

       
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              © 2025 Fan Zon. Tous droits réservés.
            </div>
            <div className="payment-methods">
              <span className="payment-text">Paiements 100% sécurisés</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
