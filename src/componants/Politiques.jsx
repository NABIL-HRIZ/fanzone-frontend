import React from 'react'
import '../styles/Politiques.css'

const Politiques = () => {
  return (
    <div className="politiques-container">
      <div className="politiques-content">
        <header className="politiques-header">
          <h1>Politique de remboursement - Fan Zon</h1>
          <div className="header-divider"></div>
        </header>

        <div className="politiques-body">
          <div className="intro-section">
            <p className="intro-text">
              Chez <strong>Fan Zon</strong>, nous nous engageons à offrir une expérience unique pour chaque supporter de la <strong>CAN Maroc 2025</strong>.
              Toutefois, certaines circonstances peuvent entraîner des modifications ou des annulations d’événements.
            </p>
            <p className="intro-text">
              Les billets pour les Fan Zones, matchs ou événements associés sont <strong>non remboursables</strong> sauf dans les cas mentionnés ci-dessous :
            </p>
          </div>

          <div className="cases-section">
            
            {/* Case 1 */}
            <div className="case-card">
              <div className="case-header">
                <h2>1. Annulation d’un événement</h2>
              </div>
              <div className="case-content">
                <ul className="case-list">
                  <li>
                    <span className="list-marker"></span>
                    En cas d’annulation officielle d’un événement ou d’un match, le remboursement du prix du billet sera effectué à l’acheteur initial.
                  </li>
                  <li>
                    <span className="list-marker"></span>
                    Les frais de service ou de transaction ne sont pas remboursables.
                  </li>
                  <li>
                    <span className="list-marker"></span>
                    Le remboursement nécessite la présentation du billet original (numérique ou imprimé).
                  </li>
                  <li>
                    <span className="list-marker"></span>
                    Aucun remboursement ne sera effectué au-delà de 30 jours après la date prévue de l’événement.
                  </li>
                </ul>
              </div>
            </div>

            {/* Case 2 */}
            <div className="case-card">
              <div className="case-header">
                <h2>2. Report ou modification de l’événement</h2>
              </div>
              <div className="case-content">
                <ul className="case-list">
                  <li>
                    <span className="list-marker"></span>
                    En cas de changement de date, d’horaire ou de lieu, <strong>Fan Zon</strong> informera tous les détenteurs de billets via e-mail ou SMS.
                  </li>
                  <li>
                    <span className="list-marker"></span>
                    Les billets restent valables pour la nouvelle date, sauf mention contraire.
                  </li>
                  <li>
                    <span className="list-marker"></span>
                    Si l’acheteur ne peut assister à la nouvelle date, une demande de remboursement peut être soumise dans un délai de 7 jours.
                  </li>
                </ul>
              </div>
            </div>

            {/* Case 3 */}
            <div className="case-card">
              <div className="case-header">
                <h2>3. Contrôle à l’entrée</h2>
              </div>
              <div className="case-content">
                <ul className="case-list">
                  <li>
                    <span className="list-marker"></span>
                    L’accès à une Fan Zone ou à un match nécessite la présentation d’un billet valide et d’une pièce d’identité.
                  </li>
                  <li>
                    <span className="list-marker"></span>
                    Les billets sont personnels et ne peuvent être échangés ou revendus sans autorisation.
                  </li>
                  <li>
                    <span className="list-marker"></span>
                    Tout billet falsifié ou dupliqué entraînera un refus d’accès sans remboursement.
                  </li>
                </ul>
              </div>
            </div>

            {/* Case 4 */}
            <div className="case-card">
              <div className="case-header">
                <h2>4. Conditions météorologiques</h2>
              </div>
              <div className="case-content">
                <ul className="case-list">
                  <li>
                    <span className="list-marker"></span>
                    En cas d’intempéries ou de conditions exceptionnelles, Fan Zon se réserve le droit de modifier ou reporter l’événement pour garantir la sécurité des participants.
                  </li>
                  <li>
                    <span className="list-marker"></span>
                    Aucun remboursement ne sera effectué si l’événement est maintenu ou reporté à une date ultérieure.
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Politiques
