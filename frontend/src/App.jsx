import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Booking from './pages/Booking/Booking';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import KitchenDisplay from './pages/Admin/KitchenDisplay';
import TableManagement from './pages/Admin/TableManagement';
import Reservations from './pages/Admin/Reservations';

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin');
  return isAdmin ? children : <Navigate to="/admin/login" />;
};

import { CartProvider } from './context/CartContext';

import Cart from './pages/Cart/Cart';
import OrderSuccess from './pages/Order/OrderSuccess';
import Loyalty from './pages/Loyalty/Loyalty';

import ScrollToAnchor from './components/layout/ScrollToAnchor';

function App() {
  return (
    <Router>
      <ScrollToAnchor />
      <CartProvider>
        <div className="bg-background min-h-screen text-textPrimary font-primary selection:bg-accent selection:text-black">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/book" element={<Booking />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/rewards" element={<Loyalty />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/kitchen"
              element={
                <ProtectedRoute>
                  <KitchenDisplay />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/tables"
              element={
                <ProtectedRoute>
                  <TableManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reservations"
              element={
                <ProtectedRoute>
                  <Reservations />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;