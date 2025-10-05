import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          // Set token first
          setToken(storedToken);
          // Verify token and get user info
          const response = await api.get('/auth/me');
          setUser(response.data);
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      const { token: newToken, username: userUsername, email } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser({ username: userUsername, email });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data || 'Login gagal';
      return { success: false, message: errorMessage };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await api.post('/auth/register', { username, email, password });
      const { token: newToken, username: userUsername, email: userEmail } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser({ username: userUsername, email: userEmail });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data || 'Registrasi gagal';
      return { success: false, message: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
