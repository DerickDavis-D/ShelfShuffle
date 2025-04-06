import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SwapProvider } from "./context/SwapContext";
import { ChatProvider } from "./context/ChatContext";
import useAuth from "../src/hooks/useAuth";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreateShelf from "./pages/CreateShelf";
import SwapRequests from "./pages/SwapRequests";
import Chat from "./pages/Chat";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/LoadingSpinner";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Public Only Route (for login/register when already authenticated)
const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <SwapProvider>
          <ChatProvider>
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              
              {/* Auth Routes */}
              <Route path="/register" element={
                <PublicOnlyRoute>
                  <Register />
                </PublicOnlyRoute>
              } />
              <Route path="/login" element={
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              } />

              {/* Protected User Routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/create-shelf" element={
                <ProtectedRoute>
                  <CreateShelf />
                </ProtectedRoute>
              } />
              <Route path="/swap-requests" element={
                <ProtectedRoute>
                  <SwapRequests />
                </ProtectedRoute>
              } />
              <Route path="/chat" element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } />

              {/* Admin Only Route */}
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ChatProvider>
        </SwapProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;