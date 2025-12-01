import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, updateQuantity } from '../redux/CartSlices';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/CartPage.css';
import axios from 'axios';
const CartPage = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();


  const total = items.reduce((total, item) => total + (item.price * item.quantity), 0);
 

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = async () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Veuillez vous connecter");
    return;
  }

  try {
   
    const zone_id = items.length > 0 ? items[0].id : null;
    const quantity = items.reduce((sum, it) => sum + (it.quantity || 0), 0);

    const response = await axios.post("http://127.0.0.1:8000/api/create-checkout-session", {
      user_id: user.id,
      items: items,  
      total_price: total.toFixed(2),
      zone_id,
      quantity
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    window.location.href = response.data.url;
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Erreur lors du paiement");
  }
};



  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-container">
          <div className="empty-icon">
            <FaShoppingBag />
          </div>
          <h2>Votre panier est vide</h2>
          <p>Découvrez nos matchs passionnants et réservez vos places</p>
          <Link to="/matches" className="back_btn">
            Explorer les matchs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div className="header-content">
          <Link to="/matches" className="back-btn">
            <FaArrowLeft />
            Retour aux matchs
          </Link>
          <h1>Votre Panier</h1>
          <p>{items.length} article(s) dans votre panier</p>
        </div>
      </div>

      <div className="cart-content">
        <div className="cart-items-section">
          <div className="section-header" style={{backgroundColor:'transparent'}}>
            <h2>Réservations</h2>
            <button onClick={handleClearCart} className="clear-cart-btn">
              <FaTrash />
              Vider le panier
            </button>
          </div>

          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  {item.image ? (
                    <img  src={`http://127.0.0.1:8000/storage/${item.image}`} />
                  ) : (
                    <div className="image-placeholder">
                      <FaShoppingBag />
                    </div>
                  )}
                </div>

                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-location">{item.city} • {item.address}</p>
                  <div className="item-meta">
                    <span className="seats-available">
                      {item.available_seats} places disponibles
                    </span>
                  </div>
                </div>

                <div className="item-quantity">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <div className="item-price">
                  <span className="price-amount">{(item.price * item.quantity).toFixed(2)} DH</span>
                 
                </div>

                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-item-btn"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="order-summary">
          <div className="summary-card">
            <h3>Résumé de la commande</h3>
            
            <div className="summary-details">
              
              <div className="summary-row total">
                <span>Total</span>
                <span>{total.toFixed(2)} DH</span>
              </div>
            </div>



              <button className='button' onClick={handleCheckout} style={{marginLeft:"60px"}}>
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
         
                                      <span>  Payer maintenant</span>
                                    
               </button>

            
          </div>

         
        </div>
      </div>

    
      
    </div>
  );
};

export default CartPage;