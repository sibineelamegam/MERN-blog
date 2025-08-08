// src/context/AuthContext.jsx

import { createContext, useState, useEffect, useContext } from 'react';
import * as authApi from '../api/authApi';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-refresh on app load
  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log('AuthContext: Attempting refreshAccessToken...');
        const data = await authApi.refreshAccessToken();
        setAuth(data);
        console.log('AuthContext: refreshAccessToken successful. Auth data:', data);
      } catch (err) {
        console.error('AuthContext: Refresh failed:', err?.response?.data?.message || err.message);
        setAuth(null);
        console.log('AuthContext: Auth set to null after refresh failure.');
      } finally {
        setLoading(false);
        console.log('AuthContext: Loading set to false.');
      }
    };

    loadUser();
  }, []);

  // Login
  const login = async ({ email, username, password }) => {
    console.log('AuthContext: Attempting login...');
    const data = await authApi.login(email, username, password);
    setAuth(data);
    console.log('AuthContext: Login successful. Auth data:', data);
    return data;
  };

  // Logout
  const logout = async () => {
    console.log('AuthContext: Attempting logout...');
    await authApi.logout();
    setAuth(null);
    console.log('AuthContext: Logout successful. Auth set to null.');
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;