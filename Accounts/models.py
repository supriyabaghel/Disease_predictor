from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.postgres.fields import ArrayField
from django.db.models import JSONField


# -----------------------------
# Custom User Manager
# -----------------------------
class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        # import here to avoid circular import
        from .models import PatientProfile
        PatientProfile.objects.create(user=user)
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user


# -----------------------------
# Custom User Model
# -----------------------------
class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = AppUserManager()

    def __str__(self):
        return self.username


# -----------------------------
# Patient Profile
# -----------------------------
class PatientProfile(models.Model):
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE)
    age = models.IntegerField(default=0)
    sex = models.CharField(max_length=20, default='Not to say')
    first_name = models.CharField(max_length=20, default='a')
    last_name = models.CharField(max_length=20, default='a')
    medical_history = ArrayField(models.CharField(max_length=200), blank=True, default=list)
    dob_day = models.IntegerField(default=0)
    dob_month = models.IntegerField(default=0)
    dob_year = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    weight = models.IntegerField(default=0)
    current_med = ArrayField(models.CharField(max_length=200), blank=True, default=list)
    exercise = models.CharField(max_length=200, default='no exercise')
    diet = models.CharField(max_length=200, default='no diet')
    smoke_cons = models.CharField(max_length=200, default='no smoking')
    alcohol_cons = models.CharField(max_length=200, default='no alcohol')
    bp_log = JSONField(default=dict)
    blood_glucose = JSONField(default=dict)
    new_patient = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username} Profile"


# -----------------------------
# Doctor Profile
# -----------------------------
class DoctorProfile(models.Model):
    name = models.CharField(max_length=200, default='NA')
    speciality = models.CharField(max_length=200, default='NA')
    sex = models.CharField(max_length=200, default='NA')
    experience = models.IntegerField(default=0)
    work_address = models.CharField(max_length=200, default='NA')
    mobile_no = models.CharField(max_length=200, default='0000000000')
    image_link = models.URLField(max_length=200)
    profile_link = models.URLField(max_length=200)

    def __str__(self):
        return f"Dr. {self.name} - {self.speciality}"


# -----------------------------
# Symptoms and Diseases
# -----------------------------
class symptoms_diseases(models.Model):
   
    itching = models.IntegerField()
    skin_rash = models.IntegerField()
    shivering = models.IntegerField()
    chills = models.IntegerField()
    # ... keep adding all the fields listed in your tutorial
    prognosis = models.CharField(max_length=100)

    class Meta:
        db_table = 'symptoms_diseases'

    def __str__(self):
        return f"Disease prognosis: {self.prognosis}"


# -----------------------------
# Predicted Diseases
# -----------------------------
class Predicted_Diseases(models.Model):
    diseases = ArrayField(models.CharField(max_length=200), blank=True, default=list)
    diseases_prob = ArrayField(models.FloatField(default=0), blank=True, default=list)
    consult_doctor = models.CharField(max_length=100, default="")

    def __str__(self):
        return f"Prediction: {self.diseases}"
