import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Bookmarks from "./pages/Bookmarks";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/register"
          element={
            <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}>
              <Register />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }}>
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <PrivateRoute>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
                <Bookmarks />
              </motion.div>
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </Router>
  );
}
