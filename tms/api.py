from rest_framework import viewsets, permissions, status
from .models import Task
from rest_framework.response import Response
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = TaskSerializer

    def list(self, request):
        tasks = Task.objects.all()
        tasks_serializer = TaskSerializer(tasks, many=True)
        return Response(tasks_serializer.data)

    def retrieve(self, request, pk):
        task = Task.objects.get(id=pk)
        task_serializer = TaskSerializer(task)
        return Response(task_serializer.data)

    def create(self, request):
        print(request)
        title = request.data['title']
        description = request.data['description']

        is_active = request.data['is_active'] == 'true' if request.data['is_active'] else 'false'

        Task.objects.create(title=title, description=description, is_active=is_active)
        return Response(Task.objects.order_by('-pk')[0].pk)

    def delete(self, request, pk):
        task = self.get_object(pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)