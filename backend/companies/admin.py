from django.contrib import admin
from .models import Company


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "owner",
        "verification_status",
        "created_at",
    )

    list_filter = (
        "verification_status",
    )

    search_fields = (
        "name",
        "owner__username",
        "owner__email",
    )