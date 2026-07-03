import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  clearTokens,
  getAccessToken,
  getCurrentUser,
  login,
  register,
  saveTokens,
} from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      const token = getAccessToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (_error) {
        clearTokens();
      } finally {
        setLoading(false);
      }
    }

    bootstrap();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      async signIn(username, password) {
        const tokens = await login(username, password);
        saveTokens(tokens.access, tokens.refresh);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        return currentUser;
      },
      async signUp(payload) {
        await register(payload);
        const tokens = await login(payload.username, payload.password);
        saveTokens(tokens.access, tokens.refresh);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        return currentUser;
      },
      signOut() {
        clearTokens();
        setUser(null);
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
