import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Verify token with backend
        const response = await axios.get('/api/v1/users/current-user');
        if (response.data.success) {
          setUser(response.data.data);
        } else {
          logout();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/v1/users/login', credentials);
      
      if (response.data.success) {
        const { accessToken, user: userData } = response.data.data;

        // Store token
        localStorage.setItem('accessToken', accessToken);

        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // Set user state
        setUser(userData);

        return { success: true, user: userData };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAdmin,
    isAuthenticated,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};