from django.urls import path
from .views import UserRegisterView, CurrentUserView

urlpatterns = [
    path(
        "register/",
        UserRegisterView.as_view(),
        name="register"
    ),
    path(
        "me/",
        CurrentUserView.as_view(),
        name="current-user"
    ),
]