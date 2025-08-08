// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BlogManagement from "./pages/BlogManagement";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import RequiredAuth from "./routes/RequiredAuth";
import PersistLogin from "./routes/PersistLogin";

function App() {
  return (
    <Routes>
      {/* Routes that do NOT use MainLayout (no header, no sidebar) */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 */}

      {/* Routes that DO use MainLayout (header, and sidebar for authenticated users) */}
      <Route element={<MainLayout />}>
        {/* Public route that uses MainLayout (for header) */}
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          {/* Accessible by admin role */}
          <Route element={<RequiredAuth allowedRoles={["admin"]} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="blogs" element={<BlogManagement />} />
            <Route path="create" element={<CreateBlog />} />
            <Route path="edit/:id" element={<EditBlog />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;