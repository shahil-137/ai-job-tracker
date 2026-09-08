from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ACCOUNT_TYPE_CHOICES = [
        ("job_seeker", "Job Seeker"),
        ("company", "Company"),
    ]

    account_type = models.CharField(
        max_length=20,
        choices=ACCOUNT_TYPE_CHOICES,
        default="job_seeker"
    )