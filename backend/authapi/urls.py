from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, ToDoViewSet

router = DefaultRouter()
router.register(r'todos', ToDoViewSet, basename='todos')

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('', include(router.urls)), 
    
 
]
