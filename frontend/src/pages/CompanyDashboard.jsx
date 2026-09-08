import { useNavigate } from "react-router-dom";

function CompanyDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("account_type");
    navigate("/");
  };

  return (
    <div className="company-dashboard">

      {/* Sidebar */}
      <aside className="company-sidebar">

        <div className="company-brand">
          <div className="company-brand-logo">AI</div>
          <span>Job Tracker</span>
        </div>

        <nav className="company-sidebar-nav">

          <button className="company-nav-item active">
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="company-nav-item"
            onClick={() => navigate("/company/jobs")}
          >
            <span>▣</span>
            Manage Jobs
          </button>

          <button
            className="company-nav-item"
            onClick={() => navigate("/company/applications")}
          >
            <span>♙</span>
            Applicants
          </button>

        </nav>

        <div className="company-sidebar-bottom">
          <button
            className="company-nav-item"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>
        </div>

      </aside>

      {/* Main */}
      <main className="company-main">

        <header className="company-topbar">

          <div>
            <h1>Company Dashboard</h1>
            <p>
              Manage your jobs and find the right talent.
            </p>
          </div>

          <div className="company-profile">
            <div className="company-profile-avatar">
              C
            </div>

            <span>Company Account</span>
          </div>

        </header>

        <div className="company-dashboard-content">

          {/* Hero */}
          <section className="company-hero">

            <div>
              <span className="company-hero-label">
                EMPLOYER PORTAL
              </span>

              <h2>
                Find great talent<br />
                for your company.
              </h2>

              <p>
                Post opportunities, manage applications,
                and connect with talented candidates.
              </p>

              <button
                className="company-hero-button"
                onClick={() => navigate("/company/jobs")}
              >
                Manage Jobs →
              </button>
            </div>

            <div className="company-hero-visual">

              <div className="company-visual-card">
                <span>Active Jobs</span>
                <strong>↗</strong>
              </div>

              <div className="company-visual-card second">
                <span>Applications</span>
                <strong>✓</strong>
              </div>

              <div className="company-visual-circle">
                AI
              </div>

            </div>

          </section>

          {/* Quick Actions */}
          <section className="company-dashboard-section">

            <div className="company-section-header">
              <div>
                <h2>Quick Actions</h2>
                <p>
                  Manage your recruitment activity.
                </p>
              </div>
            </div>

            <div className="company-action-grid">

              <button
                className="company-action-card"
                onClick={() => navigate("/company/jobs")}
              >
                <div className="company-action-icon blue">
                  ▣
                </div>

                <div>
                  <h3>Manage Jobs</h3>
                  <p>
                    Create, edit and manage your job postings.
                  </p>
                </div>

                <span className="company-action-arrow">
                  →
                </span>
              </button>

              <button
                className="company-action-card"
                onClick={() => navigate("/company/applications")}
              >
                <div className="company-action-icon purple">
                  ♙
                </div>

                <div>
                  <h3>View Applicants</h3>
                  <p>
                    Review candidates and update application status.
                  </p>
                </div>

                <span className="company-action-arrow">
                  →
                </span>
              </button>

            </div>

          </section>

          {/* Info Cards */}
          <section className="company-dashboard-section">

            <div className="company-info-grid">

              <div className="company-info-card">
                <div className="company-info-icon blue">
                  ✦
                </div>

                <div>
                  <h3>AI-Powered Matching</h3>
                  <p>
                    Candidates can analyze their resumes
                    against your job requirements.
                  </p>
                </div>
              </div>

              <div className="company-info-card">
                <div className="company-info-icon green">
                  ✓
                </div>

                <div>
                  <h3>Manage Applications</h3>
                  <p>
                    Shortlist candidates, schedule interviews,
                    and track hiring progress.
                  </p>
                </div>
              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default CompanyDashboard;