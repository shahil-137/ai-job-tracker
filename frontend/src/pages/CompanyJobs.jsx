import { useEffect, useState } from "react";
import {
  getMyJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../services/api";
import { useNavigate } from "react-router-dom";

function CompanyJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [salary, setSalary] = useState("");

  const loadJobs = async () => {
    try {
      setError("");

      const data = await getMyJobs();

      setJobs(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setEmploymentType("");
    setSalary("");
    setEditingJob(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const jobData = {
      title,
      description,
      location,
      employment_type: employmentType,
      salary,
    };

    try {
      if (editingJob) {
        await updateJob(editingJob.id, jobData);
        setMessage("Job updated successfully!");
      } else {
        await createJob(jobData);
        setMessage("Job posted successfully!");
      }

      resetForm();
      await loadJobs();

    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);

    setTitle(job.title || "");
    setDescription(job.description || "");
    setLocation(job.location || "");
    setEmploymentType(job.employment_type || "");
    setSalary(job.salary || "");

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await deleteJob(id);

      setMessage("Job deleted successfully!");

      await loadJobs();

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="manage-jobs-page">

      {/* Header */}
      <header className="manage-jobs-header">

        <div>
          <h1>Manage Jobs</h1>

          <p>
            Create and manage your company's job postings.
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

      <main className="manage-jobs-container">

        {/* Top Actions */}
        <section className="manage-jobs-top">

          <div>
            <h2>Your Job Postings</h2>

            <p>
              {jobs.length}{" "}
              {jobs.length === 1 ? "job" : "jobs"} posted
            </p>
          </div>

          <button
            className="create-job-button"
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                setShowForm(true);
                setError("");
                setMessage("");
              }
            }}
          >
            {showForm ? "Cancel" : "+ Post New Job"}
          </button>

        </section>

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

        {/* Job Form */}
        {showForm && (
          <section className="job-form-card">

            <div className="job-form-header">

              <div className="job-form-icon">
                {editingJob ? "✎" : "+"}
              </div>

              <div>
                <h2>
                  {editingJob
                    ? "Edit Job Posting"
                    : "Create New Job"}
                </h2>

                <p>
                  {editingJob
                    ? "Update the details of your job posting."
                    : "Add a new opportunity for job seekers."}
                </p>
              </div>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="manage-job-field">

                <label>Job Title</label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="e.g. Python Developer"
                  required
                />

              </div>

              <div className="manage-job-field">

                <label>Job Description</label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Describe the role, responsibilities and requirements..."
                  rows="7"
                  required
                />

              </div>

              <div className="manage-job-form-grid">

                <div className="manage-job-field">

                  <label>Location</label>

                  <input
                    type="text"
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    placeholder="e.g. Kochi, Kerala"
                  />

                </div>

                <div className="manage-job-field">

                  <label>Employment Type</label>

                  <select
                    value={employmentType}
                    onChange={(e) =>
                      setEmploymentType(e.target.value)
                    }
                  >
                    <option value="">
                      Select job type
                    </option>

                    <option value="Full Time">
                      Full Time
                    </option>

                    <option value="Part Time">
                      Part Time
                    </option>

                    <option value="Internship">
                      Internship
                    </option>

                    <option value="Contract">
                      Contract
                    </option>
                  </select>

                </div>

                <div className="manage-job-field">

                  <label>Salary</label>

                  <input
                    type="text"
                    value={salary}
                    onChange={(e) =>
                      setSalary(e.target.value)
                    }
                    placeholder="e.g. ₹4 - ₹6 LPA"
                  />

                </div>

              </div>

              <div className="job-form-actions">

                <button
                  type="button"
                  className="job-cancel-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="job-save-button"
                >
                  {editingJob
                    ? "Update Job"
                    : "Post Job"}
                </button>

              </div>

            </form>

          </section>
        )}

        {/* Jobs */}
        {jobs.length === 0 ? (

          <div className="manage-jobs-empty">

            <div className="manage-jobs-empty-icon">
              ▣
            </div>

            <h2>No job postings yet</h2>

            <p>
              Create your first job posting to start
              receiving applications from candidates.
            </p>

            <button
              className="create-job-button"
              onClick={() => setShowForm(true)}
            >
              + Post Your First Job
            </button>

          </div>

        ) : (

          <section className="company-job-list">

            {jobs.map((job) => (

              <div
                className="company-job-card"
                key={job.id}
              >

                <div className="company-job-main">

                  <div className="company-job-icon">
                    {job.title
                      ? job.title.charAt(0).toUpperCase()
                      : "J"}
                  </div>

                  <div className="company-job-info">

                    <h3>{job.title}</h3>

                    <div className="company-job-meta">

                      <span>
                        📍 {job.location || "Remote"}
                      </span>

                      <span>
                        💼{" "}
                        {job.employment_type ||
                          "Full Time"}
                      </span>

                      <span>
                        💰{" "}
                        {job.salary ||
                          "Salary not specified"}
                      </span>

                    </div>

                    <p className="company-job-description">
                      {job.description?.length > 150
                        ? `${job.description.substring(
                            0,
                            150
                          )}...`
                        : job.description}
                    </p>

                  </div>

                </div>

                <div className="company-job-actions">

                  <button
                    className="job-edit-button"
                    onClick={() => handleEdit(job)}
                  >
                    Edit
                  </button>

                  <button
                    className="job-delete-button"
                    onClick={() =>
                      handleDelete(job.id)
                    }
                  >
                    Delete
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

export default CompanyJobs;