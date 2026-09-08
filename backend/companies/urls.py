from django.urls import path
from .views import (
    CompanyListCreateView,
    CompanyDetailView,
    CompanyCreateView,
)


urlpatterns = [
    path(
        "",
        CompanyListCreateView.as_view(),
        name="company-list-create"
    ),

    path(
        "register/",
        CompanyCreateView.as_view(),
        name="company-register"
    ),

    path(
        "<int:pk>/",
        CompanyDetailView.as_view(),
        name="company-detail"
    ),
]