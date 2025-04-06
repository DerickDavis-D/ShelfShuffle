import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Configure axios base URL
  axios.defaults.baseURL = 'http://localhost:5000'; // Set your backend URL

  // Check if user is logged in on mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token && isValidToken(token)) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await axios.get('/api/users/me');
          
          if (!res.data?._id || !res.data?.email) {
            throw new Error('Invalid user data structure');
          }
          
          setUser(res.data);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, [navigate]);

  // Helper function to validate token format
  const isValidToken = (token) => {
    return typeof token === 'string' && token.length > 30;
  };

  // Helper to clear authentication data
  const clearAuthData = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      const requiredFields = ['name', 'email', 'password'];
      const missingFields = requiredFields.filter(field => !userData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing fields: ${missingFields.join(', ')}`);
      }

      const res = await axios.post('/api/users/register', userData);
      
      if (!res.data?.token) {
        throw new Error('Server response missing authentication token');
      }

      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser({
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email
      });
      navigate('/');
      
      return res.data;
    } catch (err) {
      let errorMessage = 'Registration failed';
      
      if (err.response) {
        errorMessage = err.response.data?.message || 
                      `Server responded with ${err.response.status}`;
      } else if (err.request) {
        errorMessage = 'No response from server - check your connection';
      }
      
      clearAuthData();
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      const res = await axios.post('/api/users/login', credentials);
      // Ensure backend returns role in response
      setUser({
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role || 'user' // Default to 'user' if not specified
      });}
       catch (err) {
      let errorMessage = 'Login failed';
      
      if (err.response) {
        errorMessage = err.response.data?.message || 
                      `Error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = 'Server not responding';
      }
      
      clearAuthData();
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    clearAuthData();
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      register, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;