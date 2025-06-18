import { createContext, useContext, useState, type ReactNode } from 'react';
import { useUserStore, type User } from '../store/userStore';

type AuthContextType = {
  user: User | null;
  login: (userData: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: (_: User) => { },
  logout: () => { },
});

type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const { user: _user, login: _login, logout: _logout } = useUserStore((state) => state._user);

  const [user, setUser] = useState(_user);

  const login = (userData: User) => {
    setUser(userData);
    _login(userData);
  };

  const logout = () => {
    setUser(null);
    _logout();
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}