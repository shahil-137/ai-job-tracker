from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(
        source="company.name",
        read_only=True
    )

    class Meta:
        model = Job
        fields = [
            "id",
            "company",
            "company_name",
            "title",
            "description",
            "location",
            "employment_type",
            "salary",
            "created_at",
        ]
        read_only_fields = [
            "company",
            "company_name",
            "created_at",
        ]