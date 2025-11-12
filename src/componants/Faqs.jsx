import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Faqs.css';

function Faqs() {
  return (
    <div className="modern-faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <h1 className="faq-titlle">Questions fréquemment posées</h1>
          <p className="faq-subtitle">
            Trouvez rapidement les réponses à vos questions sur <strong>Fan Zon</strong>, la plateforme officielle des supporters de la CAN Maroc 2025 🇲🇦
          </p>
        </div>

        <div className="faq-content">
          <Accordion defaultActiveKey="0" flush className="modern-accordion">

            <Accordion.Item eventKey="0" className="accordion-item-modern">
              <Accordion.Header>
                <span className="question-text">Qu’est-ce que Fan Zon ?</span>
              </Accordion.Header>
              <Accordion.Body>
                <div className="answer-content">
                  <strong>Fan Zon</strong> est une plateforme dédiée aux supporters de la <strong>CAN Maroc 2025</strong>.  
                  Elle vous permet de suivre les matchs, réserver vos places dans les fan zones, et vivre l’ambiance du football africain en temps réel.
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1" className="accordion-item-modern">
              <Accordion.Header>
                <span className="question-text">Comment réserver une place dans une Fan Zone ?</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="answer-steps">
                  <li>Connectez-vous à votre compte Fan Zon.</li>
                  <li>Choisissez le match que vous souhaitez suivre.</li>
                  <li>Sélectionnez une fan zone disponible et réservez votre place gratuitement ou avec un pass premium.</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

         

            <Accordion.Item eventKey="3" className="accordion-item-modern">
              <Accordion.Header>
                <span className="question-text">Comment recevoir une notification avant le début d’un match ?</span>
              </Accordion.Header>
              <Accordion.Body>
                <div className="answer-content">
                  Activez simplement les notifications dans votre profil.  
                  Vous recevrez une alerte quelques heures avant le coup d’envoi pour ne manquer aucun match important.
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4" className="accordion-item-modern">
              <Accordion.Header>
                <span className="question-text">Puis-je suivre les matchs en direct sur Fan Zon ?</span>
              </Accordion.Header>
              <Accordion.Body>
                <div className="answer-content">
                  Fan Zon ne diffuse pas les matchs en direct, mais vous pouvez suivre les scores, les statistiques, et les moments forts en temps réel via notre interface interactive.
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5" className="accordion-item-modern">
              <Accordion.Header>
                <span className="question-text">Comment trouver la Fan Zone la plus proche de chez moi ?</span>
              </Accordion.Header>
              <Accordion.Body>
                <div className="answer-content">
                  Utilisez la carte interactive disponible sur la page d’accueil.  
                  Elle affiche toutes les Fan Zones par ville avec les informations d’adresse, de capacité et d’ambiance prévue.
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6" className="accordion-item-modern">
              <Accordion.Header>
                <span className="question-text">Que faire si ma réservation ne s’affiche pas ?</span>
              </Accordion.Header>
              <Accordion.Body>
                <div className="answer-content">
                  Vérifiez votre connexion internet et actualisez la page.  
                  Si le problème persiste, contactez notre support via la section "Nous Contacter".
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7" className="accordion-item-modern">
              <Accordion.Header>
                <span className="question-text">Comment modifier mes informations personnelles ?</span>
              </Accordion.Header>
              <Accordion.Body>
                <div className="answer-content">
                  Rendez-vous dans votre profil utilisateur, puis cliquez sur "Modifier mes informations".  
                  Vous pouvez mettre à jour votre nom, email ou mot de passe à tout moment.
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="8" className="accordion-item-modern">
              <Accordion.Header>
                <span className="question-text">Mes données sont-elles protégées ?</span>
              </Accordion.Header>
              <Accordion.Body>
                <div className="answer-content">
                  Oui, Fan Zon respecte les normes de sécurité et de confidentialité les plus strictes.  
                  Vos données personnelles ne seront jamais partagées sans votre consentement.
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="9" className="accordion-item-modern">
              <Accordion.Header>
                <span className="question-text">Comment contacter le support Fan Zon ?</span>
              </Accordion.Header>
              <Accordion.Body>
                <div className="answer-content">
                  Vous pouvez nous joindre via :
                  <ul className="contact-methods">
                    <li><strong>Email :</strong> <a href="mailto:support@fanzon.ma">support@fanzon.ma</a></li>
                    <li><strong>Téléphone :</strong> +212 6 09 15 34 26</li>
                    <li><strong>Formulaire :</strong> Disponible sur la page “Contactez-nous”.</li>
                  </ul>
                </div>
              </Accordion.Body>
            </Accordion.Item>

          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Faqs;
