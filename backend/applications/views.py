from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from .models import Application
from .serializers import ApplicationSerializer


class ApplicationListCreateView(generics.ListCreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # Company sees applications for its own jobs
        if user.account_type == "company":
            try:
                return Application.objects.filter(
                    job__company=user.company
                )
            except Exception:
                return Application.objects.none()

        # Job seeker sees their own applications
        return Application.objects.filter(user=user)

    def perform_create(self, serializer):
        # Only job seekers can apply
        if self.request.user.account_type != "job_seeker":
            raise ValidationError(
                "Only job seekers can apply for jobs."
            )

        job = serializer.validated_data["job"]
        resume = serializer.validated_data["resume"]

        # Check if the user already applied for this job
        if Application.objects.filter(
            user=self.request.user,
            job=job
        ).exists():
            raise ValidationError(
                "You have already applied for this job."
            )

        # Check if the resume belongs to the logged-in user
        if resume.user != self.request.user:
            raise ValidationError(
                "You can only use your own resume."
            )

        serializer.save(user=self.request.user)


class ApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # Company can access applications for its own jobs
        if user.account_type == "company":
            try:
                return Application.objects.filter(
                    job__company=user.company
                )
            except Exception:
                return Application.objects.none()

        # Job seeker can access only their own applications
        return Application.objects.filter(user=user)

    def perform_update(self, serializer):
        user = self.request.user

        # Only companies can update application status
        if user.account_type != "company":
            raise ValidationError(
                "Only companies can update application status."
            )

        serializer.save()

    def perform_destroy(self, instance):
        user = self.request.user

        # Only job seekers can delete their own applications
        if user.account_type != "job_seeker":
            raise ValidationError(
                "Companies cannot delete applications."
            )

        instance.delete()