from rest_framework import serializers
from .models import Subject,Task

class SubjectSerializer(serializers.ModelSerializer):
    task_count = serializers.SerializerMethodField()
    class Meta:
        model = Subject
        fields = ["id","name","task_count"]

    def get_task_count(self,obj):
        return obj.task_set.count()

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id","title","completed","subject"]
