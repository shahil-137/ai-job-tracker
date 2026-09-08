// const API_URL = "http://127.0.0.1:8000/api";
const API_URL="https://ai-job-tracker-4-ilsp.onrender.com"


export async function login(username, password) {
  const response = await fetch(`${API_URL}/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Login failed");
  }

  return data;
}


export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    throw new Error("No refresh token found.");
  }

  const response = await fetch(`${API_URL}/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    throw new Error("Session expired. Please login again.");
  }

  localStorage.setItem("access_token", data.access);

  return data.access;
}


async function authFetch(url, options = {}) {
  let accessToken = localStorage.getItem("access_token");

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  let response = await fetch(url, options);

  if (response.status === 401) {
    accessToken = await refreshAccessToken();

    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    response = await fetch(url, options);
  }

  return response;
}


export async function getResumes() {
  const response = await authFetch(`${API_URL}/resumes/`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch resumes");
  }

  return data;
}


export async function uploadResume(title, file) {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("file", file);

  const response = await authFetch(`${API_URL}/resumes/`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to upload resume");
  }

  return data;
}


export async function deleteResume(id) {
  const response = await authFetch(`${API_URL}/resumes/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json();

    throw new Error(
      data.detail || "Failed to delete resume"
    );
  }
}


export async function getJobs() {
  const response = await authFetch(`${API_URL}/jobs/`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch jobs");
  }

  return data;
}


export async function applyToJob(jobId, resumeId) {
  const response = await authFetch(`${API_URL}/applications/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      job: jobId,
      resume: resumeId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to apply for this job"
    );
  }

  return data;
}


export async function getApplications() {
  const response = await authFetch(`${API_URL}/applications/`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to fetch applications"
    );
  }

  return data;
}


export async function registerCompany(
  name,
  website,
  location,
  description
) {
  const response = await authFetch(
    `${API_URL}/companies/register/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        website,
        location,
        description,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to register company"
    );
  }

  return data;
}


export async function getCurrentUser() {
  const response = await authFetch(`${API_URL}/users/me/`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to fetch user information"
    );
  }

  return data;
}


export async function createJob(jobData) {
  const response = await authFetch(`${API_URL}/jobs/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("Create job error:", data);

    throw new Error(
      data.detail ||
      data.company?.[0] ||
      data.title?.[0] ||
      data.description?.[0] ||
      JSON.stringify(data) ||
      "Failed to create job"
    );
  }

  return data;
}

export async function getMyJobs() {
  const response = await authFetch(`${API_URL}/jobs/`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to fetch jobs"
    );
  }

  return data;
}


export async function updateJob(id, jobData) {
  const response = await authFetch(
    `${API_URL}/jobs/${id}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to update job"
    );
  }

  return data;
}


export async function deleteJob(id) {
  const response = await authFetch(
    `${API_URL}/jobs/${id}/`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    let message = "Failed to delete job";

    try {
      const data = await response.json();

      message =
        data.detail ||
        data.error ||
        JSON.stringify(data);
    } catch {
      message = `Failed to delete job (${response.status})`;
    }

    throw new Error(message);
  }

  return true;
}

export async function analyzeResume(resumeId, jobId) {
  const response = await authFetch(`${API_URL}/ai/analyze/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resume_id: resumeId,
      job_id: jobId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to analyze resume"
    );
  }

  return data;
}

export async function updateApplication(id, applicationData) {
  const response = await authFetch(
    `${API_URL}/applications/${id}/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      "Failed to update application"
    );
  }

  return data;
}