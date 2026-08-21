import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authApi } from '../api/endpoints';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAdmin = useCallback(async () => {
    const token = localStorage.getItem('nova_admin_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await authApi.me();
      setAdmin(res.data.data);
    } catch {
      localStorage.removeItem('nova_admin_token');
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAdmin();
  }, [loadAdmin]);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    const { token, ...adminData } = res.data.data;
    localStorage.setItem('nova_admin_token', token);
    setAdmin(adminData);
    return adminData;
  };

  const logout = () => {
    localStorage.removeItem('nova_admin_token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
