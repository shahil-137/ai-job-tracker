import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">

      {/* Navbar */}
      <nav className="landing-navbar">

        <div className="landing-brand">
          <div className="landing-logo">AI</div>
          <span>Job Tracker</span>
        </div>

        <div className="landing-nav-actions">
          <button
            className="landing-login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="landing-register"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>

      </nav>

      {/* Hero */}
      <main>

        <section className="landing-hero">

          <div className="landing-hero-content">

            <span className="landing-badge">
              ✦ AI-POWERED JOB SEARCH
            </span>

            <h1>
              Find the right job
              <br />
              <span>with AI.</span>
            </h1>

            <p>
              Upload your resume, discover relevant opportunities,
              and see how well your skills match each job before you apply.
            </p>

            <div className="landing-hero-buttons">

              <button
                className="landing-primary-button"
                onClick={() => navigate("/register")}
              >
                Get Started →
              </button>

              <button
                className="landing-secondary-button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

            </div>

            <div className="landing-trust">
              <span>✓ Resume Analysis</span>
              <span>✓ AI Job Matching</span>
              <span>✓ Application Tracking</span>
            </div>

          </div>

          {/* Hero Visual */}
          <div className="landing-visual">

            <div className="landing-main-card">

              <div className="landing-card-top">
                <div className="landing-mini-logo">
                  AI
                </div>

                <span>AI Match</span>
              </div>

              <div className="landing-score">
                <strong>87%</strong>
                <span>Match Score</span>
              </div>

              <div className="landing-progress">
                <div></div>
              </div>

              <div className="landing-skills">

                <span>Python ✓</span>
                <span>Django ✓</span>
                <span>SQL ✓</span>
                <span>AWS</span>

              </div>

            </div>

            <div className="landing-floating-card landing-floating-one">
              <span>✓</span>
              <div>
                <strong>Resume analyzed</strong>
                <small>Ready for job matching</small>
              </div>
            </div>

            <div className="landing-floating-card landing-floating-two">
              <span>→</span>
              <div>
                <strong>12 Jobs found</strong>
                <small>Matching your skills</small>
              </div>
            </div>

          </div>

        </section>

        {/* Features */}
        <section className="landing-features">

          <div className="landing-section-heading">

            <span>HOW IT WORKS</span>

            <h2>
              Everything you need for your job search.
            </h2>

            <p>
              From your resume to your next opportunity,
              manage your entire job search in one place.
            </p>

          </div>

          <div className="landing-feature-grid">

            <div className="landing-feature-card">

              <div className="landing-feature-icon blue">
                📄
              </div>

              <h3>Upload Your Resume</h3>

              <p>
                Upload your PDF resume and keep your
                applications organized in one place.
              </p>

            </div>

            <div className="landing-feature-card">

              <div className="landing-feature-icon purple">
                ✦
              </div>

              <h3>AI Resume Matching</h3>

              <p>
                Analyze your resume against specific jobs
                and understand your strengths and skill gaps.
              </p>

            </div>

            <div className="landing-feature-card">

              <div className="landing-feature-icon green">
                ✓
              </div>

              <h3>Track Applications</h3>

              <p>
                Keep track of your applications and see
                whether you've been shortlisted or selected.
              </p>

            </div>

          </div>

        </section>

        {/* Company Section */}
        <section className="landing-company-section">

          <div>

            <span className="landing-company-label">
              FOR EMPLOYERS
            </span>

            <h2>
              Find talented candidates
              <br />
              for your team.
            </h2>

            <p>
              Companies can post jobs, review applications,
              view candidate resumes, and manage hiring
              progress from one place.
            </p>

          </div>

          <button
            className="landing-company-button"
            onClick={() => navigate("/register")}
          >
            Create Company Account →
          </button>

        </section>

        {/* Final CTA */}
        <section className="landing-cta">

          <h2>
            Ready to find your next opportunity?
          </h2>

          <p>
            Create your account and start using
            AI-powered job matching today.
          </p>

          <button
            onClick={() => navigate("/register")}
          >
            Get Started →
          </button>

        </section>

      </main>

      {/* Footer */}
      <footer className="landing-footer">

        <div className="landing-brand">
          <div className="landing-logo">AI</div>
          <span>Job Tracker</span>
        </div>

        <p>
          AI-powered job search and application tracking.
        </p>

        <span>
          © 2026 AI Job Tracker
        </span>

      </footer>

    </div>
  );
}

export default Index;