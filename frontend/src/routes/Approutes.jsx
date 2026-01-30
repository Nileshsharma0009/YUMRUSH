import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Page Imports
import Home from '../pages/Home/Home';
import Menu from '../pages/Menu/Menu';
import Booking from '../pages/Booking/Booking';
import Cart from '../pages/Cart/Cart';
import OrderSuccess from '../pages/Order/OrderSuccess';
import Loyalty from '../pages/Loyalty/Loyalty';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import AdminLogin from '../pages/Admin/AdminLogin';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import KitchenDisplay from '../pages/Admin/KitchenDisplay';
import TableManagement from '../pages/Admin/TableManagement';
import Reservations from '../pages/Admin/Reservations';
import NotFound from '../pages/NotFound';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin');
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/loyalty" element={<Loyalty />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

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

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
