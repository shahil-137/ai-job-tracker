from google import genai
from django.conf import settings
import json


# Create Gemini client using our API key
client = genai.Client(api_key=settings.GEMINI_API_KEY)


def analyze_resume(resume_text, job_title, job_description):
    prompt = f"""
You are an AI job matching assistant.

Analyze the candidate's resume against the specific job.

JOB TITLE:
{job_title}

JOB DESCRIPTION:
{job_description}

CANDIDATE RESUME:
{resume_text}

Return ONLY valid JSON in exactly this format:

{{
    "match_score": 0,
    "matching_skills": [],
    "missing_skills": [],
    "recommendation": ""
}}

Rules:
- match_score must be an integer from 0 to 100.
- matching_skills should contain important skills found in both the resume and job.
- missing_skills should contain important skills required by the job but not clearly found in the resume.
- recommendation should be a short and useful recommendation for the candidate.
- Do not include markdown.
- Do not include ```json.
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        return {
            "match_score": 0,
            "matching_skills": [],
            "missing_skills": [],
            "recommendation": response.text
        }