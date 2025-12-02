import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import '../styles/MyNavbar.css'
import { IoCartOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";


import { AuthContext } from "../auth/AuthContext";


import {useDispatch, useSelector } from "react-redux";


import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge
} from "react-bootstrap";
import { clearCart } from "../redux/CartSlices";
import { API_URL } from "../api/api";

function MyNavbar() {
  const { user, setUser } = useContext(AuthContext);

  const dispatch=useDispatch()
  const navigate = useNavigate();

  const cartItemsCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
     
        await axios.post(
          `${API_URL}/api/logout`,
        
          { headers: { Authorization: `Bearer ${token}` } }
        );
      

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
      dispatch(clearCart())
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Erreur logout:", err);
      localStorage.removeItem("token");
      dispatch(clearCart())
     
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top" className="px-3 custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Fan_Zon
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">

          <Nav className="me-auto" style={{marginLeft:'150px'}}>
            <Nav.Link as={Link} to="/matches">Toutes les matches</Nav.Link>
            <Nav.Link as={Link} to="/qui-sommes-nous">Qui Sommes Nous ?</Nav.Link>
            <Nav.Link as={Link} to="/faq">FAQ</Nav.Link>

            <Nav.Link as={Link} to="/cart" className="d-flex align-items-center cart-link">
              <IoCartOutline size={20} />
              <Badge bg="danger" className="ms-1">
                {cartItemsCount}
              </Badge>
            </Nav.Link>
          </Nav>

          <Nav>
            {!user ? (
              <NavDropdown
               className="navbar-dropdown"
                title={<FaBars size={20} />}
                id="guest-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/login">
                  Se connecter
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register">
                  Inscription
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item as={Link} to="/politique">
                  Politique de remboursement
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                title={
                  <>
                    <FaBars size={18} className="me-1" />
                   <Badge bg="secondary" >

                      {user.first_name[0]}{user.last_name[0]}
                    </Badge>
                  </>
                }
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Header>
                  <div className="fw-bold">{user.first_name} {user.last_name}</div>
                  <small>{user.email}</small>
                 <div className="user-role-badge" style={{textAlign:"center",width:'100%',marginTop:"15px"}}>{user.role}</div>
                </NavDropdown.Header>

                <NavDropdown.Divider />

               
               {user.role === "admin" && (
  <>
    <NavDropdown.Item as={Link} to="/admin" className="admin-item">
      Tableau de bord
    </NavDropdown.Item>
    <NavDropdown.Item as={Link} to="/admin/users" className="admin-item">
      Gérer les utilisateurs
    </NavDropdown.Item>
    <NavDropdown.Item as={Link} to="/admin/zones" className="admin-item">
      Gérer les zones
    </NavDropdown.Item>
  </>
)}

{user.role === "agent" && (
  <>
    <NavDropdown.Item as={Link} to="/profile" className="agent-item">
      Mes infos
    </NavDropdown.Item>
    <NavDropdown.Item as={Link} to="/agent/add-scan" className="agent-item">
      Scanner un ticket
    </NavDropdown.Item>
    
  </>
)}

{user.role === "fan" && (
  <>
    <NavDropdown.Item as={Link} to="/profile" className="fan-item">
      Mon profil
    </NavDropdown.Item>
    <NavDropdown.Item as={Link} to="/mes-réservations" className="fan-item">
      Mes réservations
    </NavDropdown.Item>
  </>
)}

                <NavDropdown.Divider />

               <NavDropdown.Item onClick={handleLogout} className="text-danger logout-item">
  Se déconnecter
</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
