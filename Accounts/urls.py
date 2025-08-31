from django.urls import path
from . import views

urlpatterns = [
    path('register', views.UserRegister.as_view(), name='register'),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('user', views.UserView.as_view(), name='user'),
    path('patient', views.PatientProfile.as_view(), name='patient'),
    path('doctor/<str:sp>/', views.DoctorProfileListAPIView.as_view(), name='doctor_list'),
    path('insert', views.insert_data, name='insert_data'),
    path('check_email', views.check_email, name='check_email'),
    path('check_admin', views.check_admin, name='check_admin'),
]
