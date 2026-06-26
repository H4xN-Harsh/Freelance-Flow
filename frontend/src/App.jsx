import React from "react";
import Stairs from "./components/animations/Stairs";
import NavBar from "./components/NavBar";
import { Route, Routes,Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Client from "./pages/Client";
import Task from "./pages/Task";
import ClientDetail from "./pages/ClientDetail";
import { useAuth } from "./context/AuthContext";
const App = () => {
  const { loading, user } = useAuth(); // ← add karo

  // Refresh complete hone tak wait karo
  if (loading) {
    return (
      <div className="min-h-screen bg-bg-surface flex items-center justify-center">
        <p className="text-text-muted text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <AuthPage />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <Client />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Task />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients/:id"
          element={
            <ProtectedRoute>
              <ClientDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
