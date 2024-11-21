from django.urls import path
from . import views
# router
from rest_framework import routers
from .views import ProjectViewSet, ProjectManagerViewSet, EmployeesViewSet

router = routers.DefaultRouter()
router.register('project', ProjectViewSet, basename='project')
router.register('projectmanager', ProjectManagerViewSet, basename='projectmanager')
router.register('employees', EmployeesViewSet, basename='employees')

urlpatterns = [
    
]

urlpatterns += router.urls