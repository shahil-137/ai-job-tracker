import { useEffect, useState } from "react";
import { getJobs } from "../services/api";
import { useNavigate } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        setError(error.message);
      }
    }

    loadJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.company_name?.toLowerCase().includes(search.toLowerCase());

    const matchesLocation =
      job.location?.toLowerCase().includes(location.toLowerCase());

    const matchesEmployment =
      employmentType === "" ||
      job.employment_type
        ?.toLowerCase()
        .includes(employmentType.toLowerCase());

    return matchesSearch && matchesLocation && matchesEmployment;
  });

  return (
    <div className="jobs-page">

      {/* Header */}
      <header className="jobs-header">
        <div>
          <h1>Find Jobs</h1>
          <p>
            Discover opportunities that match your skills.
          </p>
        </div>

        <button
          className="back-dashboard"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>
      </header>

      <main className="jobs-container">

        {/* Search area */}
        <section className="job-search-panel">

          <div className="search-title">
            <h2>Find your next opportunity</h2>
            <p>
              Search by job title, company or location.
            </p>
          </div>

          <div className="job-filters">

            <div className="search-input-wrapper">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Job title or company"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="search-input-wrapper">
              <span>⌖</span>

              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <select
              value={employmentType}
              onChange={(e) =>
                setEmploymentType(e.target.value)
              }
            >
              <option value="">All job types</option>
              <option value="full time">Full Time</option>
              <option value="part time">Part Time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>

          </div>

        </section>

        {error && (
          <div className="message message-error">
            {error}
          </div>
        )}

        {/* Results header */}
        <div className="jobs-results-header">
          <div>
            <h2>Available Jobs</h2>
            <p>
              {filteredJobs.length} opportunities found
            </p>
          </div>
        </div>

        {/* Jobs */}
        {filteredJobs.length === 0 ? (
          <div className="jobs-empty">
            <div>🔎</div>

            <h3>No jobs found</h3>

            <p>
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="jobs-grid">

            {filteredJobs.map((job) => (
              <div className="job-card" key={job.id}>

                <div className="job-card-top">

                  <div className="company-logo">
                    {job.company_name
                      ? job.company_name
                          .charAt(0)
                          .toUpperCase()
                      : "C"}
                  </div>

                  <span className="job-type">
                    {job.employment_type || "Full Time"}
                  </span>

                </div>

                <h3>{job.title}</h3>

                <p className="job-company">
                  {job.company_name || "Company"}
                </p>

                <div className="job-meta">

                  <span>
                    📍 {job.location || "Remote"}
                  </span>

                  <span>
                    💰 {job.salary || "Not specified"}
                  </span>

                </div>

                <div className="job-card-footer">

                  <span className="posted-label">
                    Recently posted
                  </span>

                  <button
                    className="view-job-button"
                    onClick={() =>
                      navigate(`/jobs/${job.id}`)
                    }
                  >
                    View Details →
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default Jobs;