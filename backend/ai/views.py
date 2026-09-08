from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from resumes.models import Resume
from jobs.models import Job
from .services import analyze_resume


class AnalyzeResumeView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        resume_id = request.data.get("resume_id")
        job_id = request.data.get("job_id")

        resume = Resume.objects.get(
            id=resume_id,
            user=request.user
        )

        job = Job.objects.get(id=job_id)

        result = analyze_resume(
            resume.extracted_text,
            job.title,
            job.description
        )

        return Response({
            "resume_id": resume.id,
            "job_id": job.id,
            "analysis": result
        })