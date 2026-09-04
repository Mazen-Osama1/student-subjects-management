from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action

# Create your views here.
class SubjectView(ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    def get_queryset(self):
        return Subject.objects.filter(user=self.request.user)
    def perform_create(self,serializer):
        serializer.save(user = self.request.user)

class TaskView(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    def get_queryset(self):
        queryset = self.queryset.filter(subject__user = self.request.user)

        subject_id = self.request.query_params.get("subject")
        if subject_id:
            queryset = queryset.filter(subject_id=subject_id)

        return queryset

    def perform_create(self,serializer):
        subject = serializer.validated_data["subject"]

        if subject.user != self.request.user:
            raise PermissionDenied("You dont own this user")

        serializer.save()
        
    @action(detail=False, methods=["delete"])
    def delete_all(self, request):
        self.get_queryset().delete()
        return Response({"message": "All tasks deleted successfully"})

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"message": "username and password are required !"},status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"message":"this username is used before"},status=status.HTTP_400_BAD_REQUEST)

        User.objects.create_user(username=username,password=password)
        return Response({"message": "User created successfully !"},status=status.HTTP_201_CREATED)