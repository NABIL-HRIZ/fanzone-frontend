import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaUsers,
  FaPlus,
  FaThLarge,
  FaTicketAlt,
  FaFutbol,
  FaHome,
  FaChartLine
} from "react-icons/fa";
import { IoPlayBackOutline } from "react-icons/io5";

import '../../styles/AdminSideBar.css';

const AdminSideBar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: FaHome, label: "Accueil" },
    { path: "/admin/zones", icon: FaThLarge, label: "Afficher Zones" },
    { path: "/admin/zones/add", icon: FaPlus, label: "Ajouter Zone" },
    { path: "/admin/users", icon: FaUsers, label: "Afficher Users" },
    { path: "/admin/users/add", icon: FaPlus, label: "Ajouter User" },
    { path: "/admin/matches", icon: FaFutbol, label: "Matches" },
    { path: "/admin/matches/add", icon: FaFutbol, label: "Ajouter Matches" },
    { path: "/admin/reservations", icon: FaTicketAlt, label: "Réservations" },
    { path: "/", icon: IoPlayBackOutline, label: "Retour à pageHome" },

  ];

  return (
    <aside className="admin-sidebar-simple">
      <h2 className="sidebar-title" style={{fontSize:"40px"}}>Admin Dashboard</h2>

      <ul className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <li key={item.path}>
              <Link className={`sidebar-link ${active ? "active" : ""}`} to={item.path}>
                <Icon className="sidebar-icon" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default AdminSideBar;
