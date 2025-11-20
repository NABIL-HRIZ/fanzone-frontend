import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import { FaBars } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

import { useDispatch } from "react-redux";
import { clearCart } from "../redux/CartSlice";

import { useSelector } from "react-redux";
import '../styles/MyNavbar.css';

function MyNavbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 const dispatch = useDispatch();


   const cartItemsCount = useSelector(state =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );




 const handleLogout = async () => {
  const token = localStorage.getItem("token");

  try {
    if (token) {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    
     localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("roles");
    dispatch(clearCart());
    setUser(null);
    navigate("/login");

  } catch (err) {
    console.error("Erreur logout:", err);

    localStorage.removeItem("token");
    dispatch(clearCart());
    setUser(null);
    navigate("/login");
  }
};


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="modern-navbar">
      <div className="nav-container">
        <Link className="navbar-brand-modern" to="/">
          <span className="brand-text">Fan_Zon</span>
        </Link>

        <div className="nav-center">
          <Link className="nav-link-modern" to="/matches" onClick={closeDropdown}>
            Toutes les matches
          </Link>
          <Link className="nav-link-modern" to="/qui-sommes-nous" onClick={closeDropdown}>
            Qui Sommes Nous ?
          </Link>
          <Link className="nav-link-modern" to="/faq" onClick={closeDropdown}>
            FAQ
          </Link>
       
      <Link className="nav-link-modern cart-link" to="/cart" onClick={closeDropdown}>
        <div className="cart-icon-wrapper">
          <IoCartOutline className="cart-icon"/>

          {cartItemsCount > 0 && (
            <span className="cart-badge">{cartItemsCount}</span>
          )}
        </div>
      </Link>


        </div>

        <div className="nav-right">
          <div className={`dropdown-container ${isDropdownOpen ? 'active' : ''}`}>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <div className="dropdown-toggle-content">
                <FaBars className="dropdown-icon"/>
                {user && (
                  <span className="user-avatar">
                    {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                  </span>
                )}
              </div>
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu show">
                {user ? (
                  <>
                    <div className="dropdown-user-info">
                      <div className="user-avatar-large">
                        {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                      </div>
                      <div className="user-details">
                        <div className="user-name">{user.first_name} {user.last_name}</div>
                        <div className="user-email">{user.email}</div>
                        <div className="user-role-badge">{user.role}</div>
                      </div>
                    </div>
                    
                    <div className="dropdown-divider"></div>


                    {user.role === "admin" && (
                      <>
                        <Link to="/admin" className="dropdown-item-modern" onClick={closeDropdown}>
                          <div className="menu-item-icon"></div>
                          Tableau de bord 
                        </Link>
                        <Link to="/admin/users" className="dropdown-item-modern" onClick={closeDropdown}>
                          <div className="menu-item-icon"></div>
                          Gérer les utilisateurs
                        </Link>
                        <Link to="/admin/events" className="dropdown-item-modern" onClick={closeDropdown}>
                          <div className="menu-item-icon"></div>
                          Gérer les événements
                        </Link>
                      </>
                    )}

                    {user.role === "agent" && (
                      <>
                        <Link to="/agent/profile" className="dropdown-item-modern" onClick={closeDropdown}>
                          <div className="menu-item-icon"></div>
                          Mes informations
                        </Link>
                         <Link to="/agent/add-scan" className="dropdown-item-modern" onClick={closeDropdown}>
                          <div className="menu-item-icon"></div>
                          Scanner un ticket 
                        </Link>
                        
                        <Link to="/agent/scans" className="dropdown-item-modern" onClick={closeDropdown}>
                          <div className="menu-item-icon"></div>
                          Mes Scans
                        </Link>
                        
                      </>
                    )}

                    {user.role === "fan" && (
                      <>
                        <Link to="/user/profile" className="dropdown-item-modern" onClick={closeDropdown}>
                          <div className="menu-item-icon"></div>
                          Mon profil
                        </Link>
                        <Link to="/mes-réservations" className="dropdown-item-modern" onClick={closeDropdown}>
                          <div className="menu-item-icon"></div>
                          Mes réservations
                        </Link>
                        
                        
                      </>
                    )}

                    <div className="dropdown-divider"></div>
                    
                    <button onClick={handleLogout} className="dropdown-item-logout">
                      <div className="menu-item-icon"></div>
                      Se déconnecter
                    </button>

                    <div className="dropdown-divider"></div>
                    
                    
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-item-modern" onClick={closeDropdown}>
                      <div className="menu-item-icon"></div>
                      Se connecter
                    </Link>
                    <Link to="/register" className="dropdown-item-modern" onClick={closeDropdown}>
                      <div className="menu-item-icon"></div>
                      Inscription
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link to="/politique" className="dropdown-item-modern" onClick={closeDropdown}>
                      <div className="menu-item-icon"></div>
                      Politique de remboursement
                    </Link>
                    <div className="dropdown-divider"></div>
                    
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <button className="mobile-menu-btn" onClick={toggleDropdown}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {isDropdownOpen && <div className="dropdown-overlay" onClick={closeDropdown}></div>}
    </nav>
  );
}

export default MyNavbar;