from django.db import models
from django.conf import settings


class Company(models.Model):

    VERIFICATION_STATUS = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    owner = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="company",
        null=True,
        blank=True
    )

    name = models.CharField(max_length=200)

    website = models.URLField(blank=True)

    location = models.CharField(
        max_length=200,
        blank=True
    )

    description = models.TextField(blank=True)

    verification_status = models.CharField(
        max_length=20,
        choices=VERIFICATION_STATUS,
        default="pending"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name