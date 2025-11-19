import { IoMdDoneAll } from "react-icons/io";
import { FaTicketAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Success.css';
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/CartSlice";

const Success = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/mes-réservations');
          return 0;
        }
        return prev - 1;
      });
    }, 4000); 

    return () => clearInterval(timer);
  }, [navigate]);

   useEffect(() => {
    dispatch(clearCart());  
    localStorage.removeItem("cart"); 
  }, []);

  return (
    <div className="success-page">
      <div className="success-container">
        
        <div className="success-animation">
          <div className="checkmark-container">
            <IoMdDoneAll className="checkmark-icon" />
          </div>
        </div>

        <div className="success-content">
          <h1 className="success-title">
            Paiement Réussi !
          </h1>
          <p className="success-subtitle">
            Félicitations ! Votre réservation a été confirmée avec succès
          </p>

          
          
          <div className="action-buttons">
            <button className="btn-primary" onClick={() => navigate('/mes-réservations')}>
              <FaTicketAlt />
              Voir mes tickets
              <span className="btn-badge">{countdown}s</span>
            </button>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default Success;