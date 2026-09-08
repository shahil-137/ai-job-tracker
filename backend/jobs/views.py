from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from .models import Job
from .serializers import JobSerializer


class JobListCreateView(generics.ListCreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.account_type == "company":
            try:
                return Job.objects.filter(
                    company=user.company
                )
            except Exception:
                return Job.objects.none()

        return Job.objects.all()

    def perform_create(self, serializer):
        user = self.request.user

        if user.account_type != "company":
            raise ValidationError(
                "Only company accounts can post jobs."
            )

        try:
            company = user.company
        except Exception:
            raise ValidationError(
                "Company profile not found."
            )

        if company.verification_status != "approved":
            raise ValidationError(
                "Your company must be approved before posting jobs."
            )

        serializer.save(company=company)


class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.account_type == "company":
            try:
                return Job.objects.filter(
                    company=user.company
                )
            except Exception:
                return Job.objects.none()

        return Job.objects.all()

    def perform_update(self, serializer):
        user = self.request.user

        if user.account_type != "company":
            raise ValidationError(
                "Only company accounts can edit jobs."
            )

        try:
            company = user.company
        except Exception:
            raise ValidationError(
                "Company profile not found."
            )

        if company.verification_status != "approved":
            raise ValidationError(
                "Your company must be approved before editing jobs."
            )

        serializer.save(company=company)

    def perform_destroy(self, instance):
        user = self.request.user

        if user.account_type != "company":
            raise ValidationError(
                "Only company accounts can delete jobs."
            )

        try:
            company = user.company
        except Exception:
            raise ValidationError(
                "Company profile not found."
            )

        if company.verification_status != "approved":
            raise ValidationError(
                "Your company must be approved before deleting jobs."
            )

        instance.delete()