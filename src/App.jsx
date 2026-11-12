import { Routes, Route, Navigate } from "react-router-dom"

import Layout from "./components/Layout"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import AIAssistant from "./pages/AIAssistant"
import Services from "./pages/Services"
import ServiceDetails from "./pages/ServiceDetails"
import Application from "./pages/Application"
import Applications from "./pages/Applications"
import ApplicationStatus from "./pages/ApplicationStatus"
import Documents from "./pages/Documents"
import Notifications from "./pages/Notifications"
import Profile from "./pages/Profile"

export default function App() {
  return (
    <Routes>

      {/* ==========================================
          MAIN CIVICASSIST WEBSITE
          This is accessible without login
      ========================================== */}

      <Route element={<Layout />}>

        {/* Main dashboard/home */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        {/* AI Assistant */}
        <Route
          path="/assistant"
          element={<AIAssistant />}
        />

        {/* Government Services */}
        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/services/:id"
          element={<ServiceDetails />}
        />

        {/* Application */}
        <Route
          path="/services/:id/apply"
          element={<Application />}
        />

        {/* Applications */}
        <Route
          path="/applications"
          element={<Applications />}
        />

        <Route
          path="/applications/:id"
          element={<ApplicationStatus />}
        />

        {/* Documents */}
        <Route
          path="/documents"
          element={<Documents />}
        />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={<Notifications />}
        />

        {/* User Profile / Login / Register */}
        <Route
          path="/profile"
          element={<Profile />}
        />

      </Route>


      {/* Unknown URL */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  )
}