from django.db import connection
from django.shortcuts import render
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status, generics
from django.http import JsonResponse

from .serializers import (
    UserRegisterSerializer,
    UserLoginSerializer,
    UserSerializer,
    PatientSerializer,
    DoctorProfileSerializer,
)
from .validations import custom_validation, validate_email, validate_password
from .models import DoctorProfile, AppUser


UserModel = get_user_model()


# -----------------------------
# User Registration
# -----------------------------
class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


# -----------------------------
# User Login
# -----------------------------
class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)

        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


# -----------------------------
# User Logout
# -----------------------------
class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


# -----------------------------
# Get User Info
# -----------------------------
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import AllowAny

class UserView(APIView):
    permission_classes = (AllowAny,)   # 👈 allow anyone to call it
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        if request.user.is_authenticated:
            serializer = UserSerializer(request.user)
            return Response({'authenticated': True, 'user': serializer.data}, status=status.HTTP_200_OK)
        return Response({'authenticated': False}, status=status.HTTP_200_OK)



# -----------------------------
# Check Email
# -----------------------------
def check_email(request):
    email = request.GET.get('email')
    if email:
        email_exists = AppUser.objects.filter(email=email).exists()
        return JsonResponse({'email_exists': email_exists})
    else:
        return JsonResponse({'error': 'Email parameter is missing'}, status=400)


# -----------------------------
# Patient Profile
# -----------------------------
class PatientProfile(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        profile = getattr(request.user, "patientprofile", None)
        if not profile:
            return Response({'error': 'User does not have a profile'}, status=status.HTTP_404_NOT_FOUND)
        serializer = PatientSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        serializer = PatientSerializer(
            request.user.patientprofile, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -----------------------------
# Doctor Profiles (list by speciality)
# -----------------------------
class DoctorProfileListAPIView(generics.ListAPIView):
    serializer_class = DoctorProfileSerializer

    def get_queryset(self):
        speciality = self.kwargs.get('sp', '')
        if speciality == 'All':
            queryset = DoctorProfile.objects.all()
        else:
            queryset = DoctorProfile.objects.filter(speciality__icontains=speciality)
        return queryset.order_by('?')[:12]


# -----------------------------
# Insert Sample Doctors
# -----------------------------
def insert_data(request):
    query = """
        INSERT INTO "Accounts_doctorprofile" 
        (name, speciality, sex, experience, work_address, mobile_no, image_link, profile_link)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
    """

    values = [
        ('Dr. John Smith', 'Family Medicine', 'male', 15, '123 Main St', '1234567890', 'http://img.com/1.jpg', 'http://profile.com/1'),
        ('Dr. Emma Thompson', 'Family Medicine', 'female', 12, '456 Elm St', '2345678901', 'http://img.com/2.jpg', 'http://profile.com/2'),
        # ... add all the doctors from your tutorial list
    ]

    with connection.cursor() as cursor:
        cursor.executemany(query, values)

    return render(request, 'index.html')


# -----------------------------
# Check Admin User
# -----------------------------
def check_admin(request):
    email = request.GET.get('email')
    if email:
        try:
            user = AppUser.objects.get(email=email)
            return JsonResponse({'email_exists': True, 'is_superuser': user.is_superuser})
        except AppUser.DoesNotExist:
            return JsonResponse({'email_exists': False, 'is_superuser': False})
    else:
        return JsonResponse({'error': 'Email parameter is missing'}, status=400)
