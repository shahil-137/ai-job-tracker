import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getResumes,
  uploadResume,
  deleteResume,
} from "../services/api";

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [error, setError] = useState("");

  const [selectedResume, setSelectedResume] = useState(
    localStorage.getItem("selected_resume")
  );

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const navigate = useNavigate();

  const loadResumes = async () => {
    try {
      setError("");
      const data = await getResumes();
      setResumes(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    setUploadMessage("");
    setError("");

    if (!title || !file) {
      setUploadMessage("Please enter a title and select a PDF.");
      return;
    }

    try {
      await uploadResume(title, file);

      setUploadMessage("Resume uploaded successfully!");
      setTitle("");
      setFile(null);

      e.target.reset();

      await loadResumes();
    } catch (error) {
      setUploadMessage(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      await deleteResume(id);

      if (selectedResume == id) {
        setSelectedResume(null);
        localStorage.removeItem("selected_resume");
      }

      setUploadMessage("Resume deleted successfully!");

      await loadResumes();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSelectResume = (id) => {
    setSelectedResume(id);
    localStorage.setItem("selected_resume", id);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("account_type");
    localStorage.removeItem("selected_resume");

    navigate("/");
  };

  return (
    <div className="modern-dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-logo">AI</div>
          <span>Job Tracker</span>
        </div>

        <nav className="sidebar-nav">

          <button className="nav-item active">
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="nav-item"
            onClick={() => navigate("/jobs")}
          >
            <span>🔎</span>
            Find Jobs
          </button>

          <button
            className="nav-item"
            onClick={() => navigate("/applications")}
          >
            <span>📋</span>
            Applications
          </button>

        </nav>

        <div className="sidebar-bottom">

          <button
            className="nav-item logout-item"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* Main content */}
      <main className="main-dashboard">

        {/* Top bar */}
        <header className="topbar">

          <div>
            <h1>Dashboard</h1>
            <p>Manage your job search in one place.</p>
          </div>

          <button
            className="topbar-profile"
            onClick={() => navigate("/applications")}
          >
            <span className="profile-avatar">U</span>
            <span>My Profile</span>
          </button>

        </header>

        <div className="dashboard-content">

          {/* Welcome */}
          <section className="dashboard-hero">

            <div>
              <span className="hero-label">
                AI POWERED JOB SEARCH
              </span>

              <h2>
                Find your next opportunity
                <br />
                with AI.
              </h2>

              <p>
                Upload your resume and discover how well
                your skills match available jobs.
              </p>

              <button
                className="hero-button"
                onClick={() => navigate("/jobs")}
              >
                Explore Jobs →
              </button>
            </div>

            <div className="hero-visual">
              <div className="ai-circle">
                ✦
              </div>

              <div className="floating-card match-card">
                <span>AI Match</span>
                <strong>87%</strong>
              </div>

              <div className="floating-card skill-card">
                ✓ Skills matched
              </div>
            </div>

          </section>

          {/* Stats */}
          <section className="stats-grid">

            <div className="stat-card">
              <div className="stat-icon blue">
                📄
              </div>

              <div>
                <span>Total Resumes</span>
                <strong>{resumes.length}</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                ✓
              </div>

              <div>
                <span>Selected Resume</span>
                <strong>
                  {selectedResume ? "Active" : "None"}
                </strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">
                ✦
              </div>

              <div>
                <span>AI Matching</span>
                <strong>Ready</strong>
              </div>
            </div>

          </section>

          {error && (
            <div className="message message-error">
              {error}
            </div>
          )}

          {/* Quick actions */}
          <section className="dashboard-block">

            <div className="block-header">
              <div>
                <h2>Quick Actions</h2>
                <p>Continue your job search.</p>
              </div>
            </div>

            <div className="quick-grid">

              <button
                className="quick-card"
                onClick={() => navigate("/jobs")}
              >
                <div className="quick-icon blue-bg">
                  🔎
                </div>

                <div>
                  <h3>Find Jobs</h3>
                  <p>
                    Browse jobs and check your AI match score.
                  </p>
                </div>

                <span className="arrow">→</span>
              </button>

              <button
                className="quick-card"
                onClick={() => navigate("/applications")}
              >
                <div className="quick-icon purple-bg">
                  📋
                </div>

                <div>
                  <h3>My Applications</h3>
                  <p>
                    Track your applications and their status.
                  </p>
                </div>

                <span className="arrow">→</span>
              </button>

            </div>

          </section>

          {/* Resume section */}
          <section className="dashboard-block">

            <div className="block-header">

              <div>
                <h2>My Resumes</h2>
                <p>
                  Select a resume to use for AI job matching.
                </p>
              </div>

              <span className="resume-counter">
                {resumes.length}{" "}
                {resumes.length === 1
                  ? "Resume"
                  : "Resumes"}
              </span>

            </div>

            {/* Upload */}
            <div className="upload-panel">

              <div className="upload-icon">
                ↑
              </div>

              <div className="upload-content">

                <h3>Upload a new resume</h3>

                <p>
                  PDF files only. Your resume will be
                  automatically analyzed for AI matching.
                </p>

                <form onSubmit={handleUpload}>

                  <div className="upload-fields">

                    <input
                      className="form-control"
                      type="text"
                      value={title}
                      onChange={(e) =>
                        setTitle(e.target.value)
                      }
                      placeholder="Resume title"
                    />

                    <input
                      className="form-control file-input"
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        setFile(e.target.files[0])
                      }
                    />

                    <button
                      className="btn btn-primary upload-button"
                      type="submit"
                    >
                      Upload Resume
                    </button>

                  </div>

                </form>

                {uploadMessage && (
                  <div className="message message-success">
                    {uploadMessage}
                  </div>
                )}

              </div>

            </div>

            {/* Resume cards */}
            <div className="resume-grid">

              {resumes.length === 0 ? (
                <div className="empty-card">

                  <div className="empty-icon">
                    📄
                  </div>

                  <h3>No resumes uploaded</h3>

                  <p>
                    Upload your first resume to start
                    using AI-powered job matching.
                  </p>

                </div>
              ) : (
                resumes.map((resume) => (

                  <div
                    className={`modern-resume-card ${
                      selectedResume == resume.id
                        ? "resume-selected"
                        : ""
                    }`}
                    key={resume.id}
                  >

                    <div className="resume-card-header">

                      <div className="resume-file-icon">
                        PDF
                      </div>

                      {selectedResume == resume.id && (
                        <span className="selected-badge">
                          ✓ Selected
                        </span>
                      )}

                    </div>

                    <h3>{resume.title}</h3>

                    <p className="resume-upload-date">
                      Uploaded{" "}
                      {new Date(
                        resume.created_at
                      ).toLocaleDateString()}
                    </p>

                    <div className="resume-card-actions">

                      <a
                        href={resume.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="outline-button"
                      >
                        View
                      </a>

                      <button
                        className="select-button"
                        onClick={() =>
                          handleSelectResume(resume.id)
                        }
                        disabled={
                          selectedResume == resume.id
                        }
                      >
                        {selectedResume == resume.id
                          ? "Selected"
                          : "Select"}
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(resume.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))
              )}

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;