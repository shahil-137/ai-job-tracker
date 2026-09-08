import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Index from "./pages/Index";
import Login from "./pages/login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";

import ProtectedRoute from "./components/ProtectedRoute";

import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyJobs from "./pages/CompanyJobs";
import CompanyApplications from "./pages/CompanyApplications";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={<Index />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Registration */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* =========================
            JOB SEEKER
        ========================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        {/* =========================
            COMPANY
        ========================= */}

        <Route
          path="/company/dashboard"
          element={
            <ProtectedRoute>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/company/jobs"
          element={
            <ProtectedRoute>
              <CompanyJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/company/applications"
          element={
            <ProtectedRoute>
              <CompanyApplications />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;