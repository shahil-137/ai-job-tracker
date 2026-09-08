from django.db import models
from companies.models import Company


class Job(models.Model):
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="jobs"
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200, blank=True)
    employment_type = models.CharField(max_length=100, blank=True)
    salary = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title