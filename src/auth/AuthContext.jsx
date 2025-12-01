import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      axios.get(`${API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const userData = res.data?.user || null;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      })
      .catch(() => setUser(null));
    }
  }, []);

  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

 

  return (
    <AuthContext.Provider value={{ user, setUser: saveUser }}>
      {children}
    </AuthContext.Provider>
  );
};
