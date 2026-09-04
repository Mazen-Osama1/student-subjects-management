from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .views import *

router = DefaultRouter()
router.register("subject",SubjectView)
router.register("tasks", TaskView, basename="tasks")
urlpatterns = [
    path("login/",TokenObtainPairView.as_view(),name="login"),
    path("refresh/token/" , TokenRefreshView.as_view(),name="token_refresh"),
    path("register/",RegisterView.as_view(),name="register"),
]

urlpatterns += router.urls