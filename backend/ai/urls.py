from django.urls import path
from .views import AnalyzeResumeView

urlpatterns = [
    path("analyze/", AnalyzeResumeView.as_view(), name="analyze-resume"),
]