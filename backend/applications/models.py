from django.db import models
from django.conf import settings
from jobs.models import Job
from resumes.models import Resume


class Application(models.Model):

    STATUS_CHOICES = [
        ("applied", "Applied"),
        ("shortlisted", "Shortlisted"),
        ("interview", "Interview"),
        ("rejected", "Rejected"),
        ("offer", "Offer"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    resume = models.ForeignKey(
        Resume,
        on_delete=models.CASCADE,
        related_name="applications",
        null=True,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="applied"
    )

    notes = models.TextField(blank=True)

    applied_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user} - {self.job}"