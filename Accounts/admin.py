from django.contrib import admin
from .models import AppUser, PatientProfile, DoctorProfile, symptoms_diseases, Predicted_Diseases

@admin.register(AppUser)
class AppUserAdmin(admin.ModelAdmin):
    list_display = ("user_id", "email", "username", "is_staff", "is_superuser")
    search_fields = ("email", "username")
    list_filter = ("is_staff", "is_superuser")

@admin.register(PatientProfile)
class PatientProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "age", "sex", "first_name", "last_name", "new_patient")
    search_fields = ("first_name", "last_name", "user__email")
    list_filter = ("sex", "new_patient")

@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "speciality", "sex", "experience", "mobile_no")
    search_fields = ("name", "speciality")
    list_filter = ("speciality", "sex")

@admin.register(symptoms_diseases)
class SymptomsDiseasesAdmin(admin.ModelAdmin):
    list_display = ("id", "prognosis")
    search_fields = ("prognosis",)

@admin.register(Predicted_Diseases)
class PredictedDiseasesAdmin(admin.ModelAdmin):
    list_display = ("id", "consult_doctor")
    search_fields = ("consult_doctor",)
