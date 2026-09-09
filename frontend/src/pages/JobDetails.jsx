import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getResumes,
  getApplications,
  applyToJob,
  analyzeResume,getJob
} from "../services/api";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(
    localStorage.getItem("selected_resume") || ""
  );

  const [appliedResume, setAppliedResume] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [applying, setApplying] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiError, setAiError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setError("");

        const token = localStorage.getItem("access_token");

        // const response = await fetch(
        //   `http://127.0.0.1:8000/api/jobs/${id}/`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );

        // const jobData = await response.json();

        // if (!response.ok) {
        //   throw new Error(
        //     jobData.detail || "Failed to fetch job"
        //   );
        // }

        // setJob(jobData);
        const jobData = await getJob(id);
setJob(jobData);

        const resumeData = await getResumes();
        setResumes(resumeData);

        const savedResume = localStorage.getItem("selected_resume");

        const savedResumeExists = resumeData.some(
          (resume) => resume.id == savedResume
        );

        if (savedResumeExists) {
          setSelectedResume(savedResume);
        } else if (resumeData.length > 0) {
          setSelectedResume(resumeData[0].id);
        }

        const applicationData = await getApplications();

        const existingApplication = applicationData.find(
          (application) => application.job == id
        );

        if (existingApplication) {
          setAlreadyApplied(true);

          const resumeUsed = resumeData.find(
            (resume) => resume.id == existingApplication.resume
          );

          setAppliedResume(resumeUsed);
        }
      } catch (error) {
        setError(error.message);
      }
    }

    loadData();
  }, [id]);

  const handleSelectResume = (resumeId) => {
    setSelectedResume(resumeId);
    localStorage.setItem("selected_resume", resumeId);

    setAiAnalysis(null);
    setAiError("");
  };

  const handleAnalyzeResume = async () => {
    setAiError("");
    setAiAnalysis(null);

    if (!selectedResume) {
      setAiError("Please select a resume first.");
      return;
    }

    try {
      setAnalyzing(true);

      const result = await analyzeResume(
        selectedResume,
        id
      );

      setAiAnalysis(result.analysis);
    } catch (error) {
      setAiError(error.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleApply = async () => {
    setError("");
    setMessage("");

    if (!selectedResume) {
      setError("Please select a resume before applying.");
      return;
    }

    if (alreadyApplied) {
      return;
    }

    try {
      setApplying(true);

      await applyToJob(id, selectedResume);

      const resumeUsed = resumes.find(
        (resume) => resume.id == selectedResume
      );

      setAppliedResume(resumeUsed);
      setAlreadyApplied(true);
      setMessage("Application submitted successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setApplying(false);
    }
  };

  if (error && !job) {
    return (
      <div className="job-details-page">
        <div className="job-details-error">
          <h2>Unable to load job</h2>
          <p>{error}</p>

          <button
            className="back-dashboard"
            onClick={() => navigate("/jobs")}
          >
            ← Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-details-loading">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="job-details-page">

      {/* Header */}
      <header className="job-details-header">
        <button
          className="job-back-button"
          onClick={() => navigate("/jobs")}
        >
          ← Back to Jobs
        </button>
      </header>

      <main className="job-details-container">

        {/* Job Hero */}
        <section className="job-details-hero">

          <div className="job-details-company-logo">
            {job.company_name
              ? job.company_name.charAt(0).toUpperCase()
              : "C"}
          </div>

          <div className="job-details-title-area">
            <span className="job-details-label">
              JOB OPPORTUNITY
            </span>

            <h1>{job.title}</h1>

            <p className="job-details-company">
              {job.company_name || "Company"}
            </p>

            <div className="job-details-meta">
              <span>
                📍 {job.location || "Remote"}
              </span>

              <span>
                💼 {job.employment_type || "Full Time"}
              </span>

              <span>
                💰 {job.salary || "Salary not specified"}
              </span>
            </div>
          </div>

        </section>

        <div className="job-details-layout">

          {/* Left */}
          <section className="job-details-main">

            {/* Description */}
            <div className="details-card">
              <div className="details-card-header">
                <h2>Job Description</h2>
              </div>

              <div className="job-description">
                {job.description}
              </div>
            </div>

            {/* AI Analysis */}
            {!alreadyApplied && (
              <div className="ai-analysis-card">

                <div className="ai-analysis-header">
                  <div className="ai-analysis-icon">
                    ✦
                  </div>

                  <div>
                    <h2>AI Resume Match</h2>
                    <p>
                      See how well your resume matches this job.
                    </p>
                  </div>
                </div>

                {resumes.length === 0 ? (
                  <div className="ai-no-resume">
                    <p>
                      You don't have a resume uploaded yet.
                    </p>

                    <button
                      className="browse-jobs-button"
                      onClick={() => navigate("/dashboard")}
                    >
                      Upload Resume
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="resume-analysis-selector">

                      <label>Select Resume</label>

                      <select
                        value={selectedResume}
                        onChange={(e) =>
                          handleSelectResume(e.target.value)
                        }
                      >
                        <option value="">
                          Select a resume
                        </option>

                        {resumes.map((resume) => (
                          <option
                            key={resume.id}
                            value={resume.id}
                          >
                            {resume.title}
                          </option>
                        ))}
                      </select>

                    </div>

                    <button
                      className="analyze-button"
                      onClick={handleAnalyzeResume}
                      disabled={
                        analyzing ||
                        !selectedResume
                      }
                    >
                      {analyzing
                        ? "Analyzing Resume..."
                        : "✦ Analyze My Resume"}
                    </button>

                    {aiError && (
                      <div className="message message-error">
                        {aiError}
                      </div>
                    )}

                    {aiAnalysis && (
                      <div className="ai-result">

                        <div className="match-score-section">

                          <div className="score-circle">
                            <strong>
                              {aiAnalysis.match_score}
                            </strong>

                            <span>/100</span>
                          </div>

                          <div>
                            <h3>
                              {aiAnalysis.match_score >= 80
                                ? "Excellent Match"
                                : aiAnalysis.match_score >= 60
                                ? "Good Match"
                                : aiAnalysis.match_score >= 40
                                ? "Partial Match"
                                : "Low Match"}
                            </h3>

                            <p>
                              Based on your selected resume
                              and this job description.
                            </p>
                          </div>

                        </div>

                        <div className="ai-skills-grid">

                          <div className="skill-section matching">
                            <h3>✓ Matching Skills</h3>

                            {aiAnalysis.matching_skills?.length ? (
                              <div className="skill-tags">
                                {aiAnalysis.matching_skills.map(
                                  (skill, index) => (
                                    <span key={index}>
                                      {skill}
                                    </span>
                                  )
                                )}
                              </div>
                            ) : (
                              <p>
                                No matching skills found.
                              </p>
                            )}
                          </div>

                          <div className="skill-section missing">
                            <h3>⚠ Missing Skills</h3>

                            {aiAnalysis.missing_skills?.length ? (
                              <div className="skill-tags">
                                {aiAnalysis.missing_skills.map(
                                  (skill, index) => (
                                    <span key={index}>
                                      {skill}
                                    </span>
                                  )
                                )}
                              </div>
                            ) : (
                              <p>
                                No major missing skills.
                              </p>
                            )}
                          </div>

                        </div>

                        <div className="ai-recommendation">
                          <h3>AI Recommendation</h3>

                          <p>
                            {aiAnalysis.recommendation}
                          </p>
                        </div>

                      </div>
                    )}
                  </>
                )}

              </div>
            )}

          </section>

          {/* Right Sidebar */}
          <aside className="job-details-sidebar">

            {alreadyApplied ? (
              <div className="application-success-card">

                <div className="success-icon">
                  ✓
                </div>

                <h2>Application Submitted</h2>

                <p>
                  You have already applied for this
                  position.
                </p>

                {appliedResume && (
                  <div className="applied-resume">
                    <span>Resume Used</span>
                    <strong>
                      {appliedResume.title}
                    </strong>
                  </div>
                )}

                <div className="current-status">
                  <span>Status</span>
                  <strong>Applied</strong>
                </div>

                <button
                  className="application-view-button"
                  onClick={() =>
                    navigate("/applications")
                  }
                >
                  View My Applications →
                </button>

              </div>
            ) : (
              <div className="apply-card">

                <h2>Ready to apply?</h2>

                <p>
                  Make sure you've selected the resume
                  you want to send with your application.
                </p>

                {resumes.length > 0 && (
                  <div className="selected-resume-box">

                    <span>Selected Resume</span>

                    <strong>
                      {resumes.find(
                        (resume) =>
                          resume.id == selectedResume
                      )?.title || "No resume selected"}
                    </strong>

                  </div>
                )}

                <button
                  className="apply-now-button"
                  onClick={handleApply}
                  disabled={
                    applying ||
                    resumes.length === 0 ||
                    !selectedResume
                  }
                >
                  {applying
                    ? "Submitting..."
                    : "Apply Now →"}
                </button>

                {error && (
                  <div className="message message-error">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="message message-success">
                    {message}
                  </div>
                )}

              </div>
            )}

            <div className="job-sidebar-info">

              <h3>Application Tips</h3>

              <div>
                <span>✦</span>
                <p>
                  Analyze your resume before applying.
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  Make sure your resume matches the
                  job requirements.
                </p>
              </div>

              <div>
                <span>→</span>
                <p>
                  Keep your resume updated with your
                  latest skills.
                </p>
              </div>

            </div>

          </aside>

        </div>

      </main>
    </div>
  );
}

export default JobDetails;