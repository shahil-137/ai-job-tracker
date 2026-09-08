import { useEffect, useState } from "react";
import { getApplications, updateApplication } from "../services/api";
import { useNavigate } from "react-router-dom";

function CompanyApplications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const loadApplications = async () => {
    try {
      setError("");

      const data = await getApplications();

      setApplications(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleStatusChange = async (
    application,
    newStatus
  ) => {
    try {
      setError("");
      setMessage("");

      await updateApplication(
        application.id,
        {
          status: newStatus,
        }
      );

      setMessage(
        "Application status updated successfully!"
      );

      await loadApplications();

    } catch (error) {
      setError(error.message);
    }
  };

  const formatStatus = (status) => {
    if (!status) return "Applied";

    return (
      status.charAt(0).toUpperCase() +
      status.slice(1)
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "shortlisted":
        return "company-status-shortlisted";

      case "interview":
        return "company-status-interview";

      case "offer":
        return "company-status-offer";

      case "rejected":
        return "company-status-rejected";

      default:
        return "company-status-applied";
    }
  };

  return (
    <div className="company-applications-page">

      {/* Header */}
      <header className="company-applications-header">

        <div>
          <h1>Applicants</h1>

          <p>
            Review candidates and manage their application status.
          </p>
        </div>

        <button
          className="back-dashboard"
          onClick={() =>
            navigate("/company/dashboard")
          }
        >
          ← Dashboard
        </button>

      </header>

      <main className="company-applications-container">

        {/* Summary */}
        <div className="company-applications-summary">

          <div className="company-summary-card">

            <div className="company-summary-icon blue">
              ♙
            </div>

            <div>
              <span>Total Applications</span>
              <strong>{applications.length}</strong>
            </div>

          </div>

          <div className="company-summary-card">

            <div className="company-summary-icon green">
              ✓
            </div>

            <div>
              <span>Shortlisted</span>
              <strong>
                {
                  applications.filter(
                    (app) =>
                      app.status === "shortlisted"
                  ).length
                }
              </strong>
            </div>

          </div>

          <div className="company-summary-card">

            <div className="company-summary-icon purple">
              ★
            </div>

            <div>
              <span>Interviews</span>
              <strong>
                {
                  applications.filter(
                    (app) =>
                      app.status === "interview"
                  ).length
                }
              </strong>
            </div>

          </div>

        </div>

        {message && (
          <div className="message message-success">
            {message}
          </div>
        )}

        {error && (
          <div className="message message-error">
            {error}
          </div>
        )}

        {/* Applicants */}
        {applications.length === 0 ? (

          <div className="company-applications-empty">

            <div className="company-empty-icon">
              ♙
            </div>

            <h2>No applications yet</h2>

            <p>
              Applications from candidates will appear here
              when they apply to your jobs.
            </p>

            <button
              className="company-primary-button"
              onClick={() =>
                navigate("/company/jobs")
              }
            >
              Manage Jobs →
            </button>

          </div>

        ) : (

          <section className="company-applicants-section">

            <div className="company-applicants-title">

              <div>
                <h2>Candidate Applications</h2>

                <p>
                  Review and manage candidates who
                  applied to your jobs.
                </p>
              </div>

            </div>

            <div className="company-applicants-list">

              {applications.map((application) => (

                <div
                  className="company-applicant-card"
                  key={application.id}
                >

                  {/* Candidate */}
                  <div className="applicant-main">

                    <div className="applicant-avatar">
                      {application.applicant_username
                        ? application.applicant_username
                            .charAt(0)
                            .toUpperCase()
                        : "U"}
                    </div>

                    <div className="applicant-info">

                      <h3>
                        {application.applicant_username}
                      </h3>

                      <p className="applicant-email">
                        {application.applicant_email}
                      </p>

                      <div className="applicant-job">
                        <span>Job</span>

                        <strong>
                          {application.job_title}
                        </strong>
                      </div>

                    </div>

                  </div>

                  {/* Resume */}
                  <div className="applicant-resume">

                    <span>Resume</span>

                    <strong>
                      {application.resume_title ||
                        "No resume"}
                    </strong>

                    {application.resume_file && (
                      <a
                        href={application.resume_file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-view-link"
                      >
                        View Resume →
                      </a>
                    )}

                  </div>

                  {/* Status */}
                  <div className="applicant-status-area">

                    <span
                      className={`company-application-status ${getStatusClass(
                        application.status
                      )}`}
                    >
                      {formatStatus(
                        application.status
                      )}
                    </span>

                    <label>
                      Update Status

                      <select
                        value={application.status}
                        onChange={(e) =>
                          handleStatusChange(
                            application,
                            e.target.value
                          )
                        }
                      >
                        <option value="applied">
                          Applied
                        </option>

                        <option value="shortlisted">
                          Shortlisted
                        </option>

                        <option value="interview">
                          Interview
                        </option>

                        <option value="rejected">
                          Rejected
                        </option>

                        <option value="offer">
                          Offer
                        </option>
                      </select>
                    </label>

                  </div>

                </div>

              ))}

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default CompanyApplications;