from django.db import transaction
from rest_framework import serializers

from .models import User
from companies.models import Company


class UserSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(
        required=False,
        allow_blank=True
    )

    company_website = serializers.URLField(
        required=False,
        allow_blank=True
    )

    company_location = serializers.CharField(
        required=False,
        allow_blank=True
    )

    company_description = serializers.CharField(
        required=False,
        allow_blank=True
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "account_type",
            "company_name",
            "company_website",
            "company_location",
            "company_description",
        ]

        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def validate(self, data):
        account_type = data.get(
            "account_type",
            "job_seeker"
        )

        if account_type == "company":
            company_name = data.get(
                "company_name",
                ""
            ).strip()

            if not company_name:
                raise serializers.ValidationError({
                    "company_name": "Company name is required."
                })

        return data

    @transaction.atomic
    def create(self, validated_data):
        company_name = validated_data.pop(
            "company_name",
            ""
        )

        company_website = validated_data.pop(
            "company_website",
            ""
        )

        company_location = validated_data.pop(
            "company_location",
            ""
        )

        company_description = validated_data.pop(
            "company_description",
            ""
        )

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            account_type=validated_data.get(
                "account_type",
                "job_seeker"
            )
        )

        if user.account_type == "company":
            Company.objects.create(
                owner=user,
                name=company_name,
                website=company_website,
                location=company_location,
                description=company_description,
                verification_status="pending"
            )

        return user