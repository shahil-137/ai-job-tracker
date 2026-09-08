import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("job_seeker");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (accountType === "company" && !companyName.trim()) {
      setError("Company name is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        // "http://127.0.0.1:8000/api/users/register/"
        "https://ai-job-tracker-7-zn9x.onrender.com/api",
        
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            account_type: accountType,
            ...(accountType === "company"
              ? {
                  company_name: companyName,
                  company_website: companyWebsite,
                  company_location: companyLocation,
                  company_description: companyDescription,
                }
              : {}),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const firstError = Object.values(data)?.[0];

        throw new Error(
          Array.isArray(firstError)
            ? firstError[0]
            : firstError || "Registration failed."
        );
      }

      if (accountType === "company") {
        setMessage(
          "Registration successful! Your company is now waiting for admin approval."
        );
      } else {
        setMessage("Registration successful! You can now login.");
      }

      setUsername("");
      setEmail("");
      setPassword("");
      setCompanyName("");
      setCompanyWebsite("");
      setCompanyLocation("");
      setCompanyDescription("");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        {/* Header */}
        <div className="register-header">

          <div className="register-logo">
            AI
          </div>

          <h1>Create your account</h1>

          <p>
            Start your journey with AI-powered job matching.
          </p>

        </div>

        {/* Account Type */}
        <div className="account-type-section">

          <label>Account Type</label>

          <div className="account-type-options">

            <button
              type="button"
              className={
                accountType === "job_seeker"
                  ? "account-type active"
                  : "account-type"
              }
              onClick={() => {
                setAccountType("job_seeker");
                setError("");
                setMessage("");
              }}
            >
              <span className="account-type-icon">
                👤
              </span>

              <div>
                <strong>Job Seeker</strong>
                <small>Find your next opportunity</small>
              </div>

            </button>

            <button
              type="button"
              className={
                accountType === "company"
                  ? "account-type active"
                  : "account-type"
              }
              onClick={() => {
                setAccountType("company");
                setError("");
                setMessage("");
              }}
            >
              <span className="account-type-icon">
                🏢
              </span>

              <div>
                <strong>Company</strong>
                <small>Post jobs and find talent</small>
              </div>

            </button>

          </div>

        </div>

        {/* Form */}
        <form
          className="register-form"
          onSubmit={handleRegister}
        >

          <div className="register-form-row">

            <div className="register-field">
              <label>Username</label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="Choose a username"
                required
              />
            </div>

            <div className="register-field">
              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                required
              />
            </div>

          </div>

          <div className="register-field">

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Create a password"
              required
            />

          </div>

          {/* Company Fields */}
          {accountType === "company" && (
            <div className="company-registration-section">

              <div className="company-section-heading">
                <div className="company-section-icon">
                  🏢
                </div>

                <div>
                  <h3>Company Information</h3>
                  <p>
                    Tell us about your company.
                  </p>
                </div>
              </div>

              <div className="register-field">

                <label>Company Name</label>

                <input
                  type="text"
                  value={companyName}
                  onChange={(e) =>
                    setCompanyName(e.target.value)
                  }
                  placeholder="Your company name"
                  required
                />

              </div>

              <div className="register-form-row">

                <div className="register-field">

                  <label>Website</label>

                  <input
                    type="url"
                    value={companyWebsite}
                    onChange={(e) =>
                      setCompanyWebsite(e.target.value)
                    }
                    placeholder="https://example.com"
                  />

                </div>

                <div className="register-field">

                  <label>Location</label>

                  <input
                    type="text"
                    value={companyLocation}
                    onChange={(e) =>
                      setCompanyLocation(e.target.value)
                    }
                    placeholder="Kochi, Kerala"
                  />

                </div>

              </div>

              <div className="register-field">

                <label>Description</label>

                <textarea
                  value={companyDescription}
                  onChange={(e) =>
                    setCompanyDescription(e.target.value)
                  }
                  placeholder="Briefly describe your company..."
                  rows="3"
                />

              </div>

              <div className="company-approval-note">
                <span>ℹ</span>

                <p>
                  Company accounts require admin approval
                  before you can post jobs.
                </p>
              </div>

            </div>
          )}

          {/* Messages */}
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

          <button
            className="register-button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account →"}
          </button>

        </form>

        {/* Footer */}
        <div className="register-footer">

          <span>Already have an account?</span>

          <button
            type="button"
            onClick={() => navigate("/")}
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Register;