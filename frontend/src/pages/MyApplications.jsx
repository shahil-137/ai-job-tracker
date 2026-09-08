import { useEffect, useState } from "react";
import { getApplications } from "../services/api";
import { useNavigate } from "react-router-dom";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function loadApplications() {
      try {
        setError("");

        const data = await getApplications();

        setApplications(data);
      } catch (error) {
        setError(error.message);
      }
    }

    loadApplications();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "applied":
        return "status-applied";

      case "shortlisted":
        return "status-shortlisted";

      case "interview":
        return "status-interview";

      case "offer":
        return "status-offer";

      case "rejected":
        return "status-rejected";

      default:
        return "status-applied";
    }
  };

  const formatStatus = (status) => {
    if (!status) return "Applied";

    return (
      status.charAt(0).toUpperCase() +
      status.slice(1)
    );
  };

  return (
    <div className="applications-page">

      {/* Header */}
      <header className="applications-header">
        <div>
          <h1>My Applications</h1>

          <p>
            Track your job applications and stay updated.
          </p>
        </div>

        <button
          className="back-dashboard"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>
      </header>

      <main className="applications-container">

        {/* Summary */}
        <section className="applications-summary">

          <div className="summary-icon">
            📋
          </div>

          <div>
            <span>Total Applications</span>

            <strong>
              {applications.length}
            </strong>
          </div>

        </section>

        {error && (
          <div className="message message-error">
            {error}
          </div>
        )}

        {/* Applications */}
        {applications.length === 0 ? (

          <div className="applications-empty">

            <div className="empty-application-icon">
              📋
            </div>

            <h2>No applications yet</h2>

            <p>
              You haven't applied for any jobs yet.
              Start exploring opportunities and submit
              your first application.
            </p>

            <button
              className="browse-jobs-button"
              onClick={() => navigate("/jobs")}
            >
              Browse Jobs →
            </button>

          </div>

        ) : (

          <section className="applications-list">

            <div className="applications-list-header">

              <div>
                <h2>Your Applications</h2>

                <p>
                  {applications.length}{" "}
                  {applications.length === 1
                    ? "application"
                    : "applications"}
                </p>
              </div>

            </div>

            {applications.map((application) => (

              <div
                className="application-card"
                key={application.id}
              >

                {/* Application Main */}
                <div className="application-main">

                  <div className="application-company-logo">
                    {application.company_name
                      ? application.company_name
                          .charAt(0)
                          .toUpperCase()
                      : "C"}
                  </div>

                  <div className="application-info">

                    <h3>
                      {application.job_title}
                    </h3>

                    <p className="application-company">
                      {application.company_name ||
                        "Company"}
                    </p>

                    <div className="application-meta">

                      <span>
                        📍{" "}
                        {application.job_location ||
                          "Location not specified"}
                      </span>

                      <span>
                        📄{" "}
                        {application.resume_title ||
                          "Resume not specified"}
                      </span>

                    </div>

                    <p className="application-date">
                      Applied on{" "}
                      {new Date(
                        application.applied_at
                      ).toLocaleDateString()}
                    </p>

                  </div>

                </div>

                {/* Status + Button */}
                <div className="application-side">

                  <span
                    className={`application-status ${getStatusClass(
                      application.status
                    )}`}
                  >
                    {formatStatus(
                      application.status
                    )}
                  </span>

                  <button
                    className="application-view-button"
                    onClick={() =>
                      navigate(
                        `/jobs/${application.job}`
                      )
                    }
                  >
                    View Job →
                  </button>

                </div>

              </div>

            ))}

          </section>

        )}

      </main>

    </div>
  );
}

export default MyApplications;