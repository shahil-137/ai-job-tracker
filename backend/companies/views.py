from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from .models import Company
from .serializers import CompanySerializer


class CompanyCreateView(generics.CreateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.account_type != "company":
            raise ValidationError(
                "Only company accounts can register a company."
            )

        if Company.objects.filter(owner=self.request.user).exists():
            raise ValidationError(
                "You already have a company registered."
            )

        serializer.save(
            owner=self.request.user,
            verification_status="pending"
        )


class CompanyListCreateView(generics.ListCreateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.account_type != "company":
            return Company.objects.none()

        return Company.objects.filter(
            owner=self.request.user
        )

    def perform_create(self, serializer):
        if self.request.user.account_type != "company":
            raise ValidationError(
                "Only company accounts can create a company."
            )

        if Company.objects.filter(owner=self.request.user).exists():
            raise ValidationError(
                "You already have a company registered."
            )

        serializer.save(
            owner=self.request.user,
            verification_status="pending"
        )


class CompanyDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.account_type != "company":
            return Company.objects.none()

        return Company.objects.filter(
            owner=self.request.user
        )