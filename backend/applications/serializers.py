from rest_framework import serializers
from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(
        source="job.title",
        read_only=True
    )

    company_name = serializers.CharField(
        source="job.company.name",
        read_only=True
    )

    job_location = serializers.CharField(
        source="job.location",
        read_only=True
    )

    resume_title = serializers.CharField(
        source="resume.title",
        read_only=True
    )

    applicant_username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    applicant_email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    resume_file = serializers.FileField(
        source="resume.file",
        read_only=True
    )

    class Meta:
        model = Application

        fields = [
            "id",
            "user",
            "applicant_username",
            "applicant_email",
            "job",
            "job_title",
            "company_name",
            "job_location",
            "resume",
            "resume_title",
            "resume_file",
            "status",
            "notes",
            "applied_at",
            "updated_at",
        ]

        read_only_fields = [
            "user",
            "applicant_username",
            "applicant_email",
            "job_title",
            "company_name",
            "job_location",
            "resume_title",
            "resume_file",
            "applied_at",
            "updated_at",
        ]