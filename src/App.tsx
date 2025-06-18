import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage/LoginPage';
import { AuthLayout } from './layouts/AuthLayout/AuthLayout';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import { MainLayout } from './layouts/MainLayout/MainLayout';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

type Props = {
  children: ReactNode
}

export function PrivateRoute({ children }: Props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
    </Routes>
  );
}