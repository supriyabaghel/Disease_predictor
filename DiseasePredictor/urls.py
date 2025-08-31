from django.urls import path
from .views import insert_patient_data, train, predict

urlpatterns = [
    path("predict/", predict, name="predict"),
    path("insertpd", insert_patient_data, name="insert_patient_data"),
    path("train", train, name="train_model"),
]
