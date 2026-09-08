from rest_framework import serializers
from .models import Company


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = [
            "id",
            "owner",
            "name",
            "website",
            "location",
            "description",
            "verification_status",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "owner",
            "verification_status",
            "created_at",
        ]