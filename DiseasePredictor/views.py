# DiseasePredictor/views.py
from Accounts.models import symptoms_diseases, Predicted_Diseases
from Accounts.serializers import PredictionSerializer
from django.shortcuts import render
import pandas as pd
import numpy as np
from imblearn.over_sampling import RandomOverSampler
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
import csv
from django.db import transaction
import os
import pickle
import traceback

# -----------------------------
# Insert Training Data into DB
# -----------------------------
def insert_patient_data(request):
    data = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'Training.csv')
    with open(data, 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip header
        with transaction.atomic():
            for row in reader:
                symptom_values = [int(value) for value in row[:-1]]
                prognosis = row[-1]

                field_names = [
                    field.name for field in symptoms_diseases._meta.fields
                    if field.name not in ['id', 'prognosis']
                ]
                field_values = dict(zip(field_names, symptom_values))
                instance = symptoms_diseases.objects.create(prognosis=prognosis, **field_values)
                instance.save()
    return render(request, 'index.html')


# -----------------------------
# Train SVM Model
# -----------------------------
def train(request):
    data = pd.DataFrame.from_records(
        symptoms_diseases.objects.all().values()
    ).drop('id', axis=1)

    scaler = StandardScaler()
    X = data[data.columns[:-1]].values
    y = data[data.columns[-1]].values
    X = scaler.fit_transform(X)

    ros = RandomOverSampler()
    X, y = ros.fit_resample(X, y)

    svm_model = SVC(probability=True)
    svm_model = svm_model.fit(X, y)

    # Save model + scaler
    with open('model.pkl', 'wb') as f:
        pickle.dump(svm_model, f)
    with open('scaler.pkl', 'wb') as f:
        pickle.dump(scaler, f)

    return render(request, 'index.html')


# -----------------------------
# Predict Endpoint (POST)
# -----------------------------
# -----------------------------
# Predict Endpoint (POST)
# -----------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def predict(request):
    import traceback
    try:
        with open('model.pkl', 'rb') as f:
            svm_model = pickle.load(f)
        with open('scaler.pkl', 'rb') as f:
            scaler = pickle.load(f)
    except FileNotFoundError:
        return Response({"error": "Model not trained yet. Run /train first."}, status=500)

    # Get symptoms from request
    symptoms = request.data.get("symptoms", [])
    if not isinstance(symptoms, list) or not symptoms:
        return Response({"error": "Symptoms must be a non-empty list"}, status=400)

    # Available DB fields (symptoms)
    all_symptom_names = [
        f.name for f in symptoms_diseases._meta.fields
        if f.name not in ['id', 'prognosis']
    ]
    x = np.zeros(len(all_symptom_names), dtype=int)

    # Normalize incoming symptom names
    for s in symptoms:
        normalized = s.strip().lower().replace(" ", "_")
        if normalized in all_symptom_names:
            idx = all_symptom_names.index(normalized)
            x[idx] = 1
        else:
            print(f"⚠️ Symptom not found in DB: {s}")

    x = x.reshape(1, -1)
    x = scaler.transform(x)

    # Prediction
    probas = svm_model.predict_proba(x)
    top5_indices = np.argsort(probas, axis=1)[:, -5:]
    top5_values = np.take_along_axis(probas, top5_indices, axis=1)
    top5_labels = svm_model.classes_[top5_indices]

    pd_labels = top5_labels[0][::-1].tolist()
    pd_prob = top5_values[0][::-1].astype(float).tolist()
    predicted_disease = pd_labels[0]

    # -------------------------
    # Doctor Specialty Mapping
    # -------------------------
    Rheumatologist = ['Osteoarthristis', 'Arthritis']
    Cardiologist = ['Heart attack', 'Bronchial Asthma', 'Hypertension']
    ENT_specialist = ['(vertigo) Paroymsal  Positional Vertigo', 'Hypothyroidism']
    Neurologist = ['Varicose veins', 'Paralysis (brain hemorrhage)', 'Migraine']
    Allergist_Immunologist = ['Allergy', 'Pneumonia', 'AIDS', 'Common Cold', 'Tuberculosis', 'Malaria']
    Urologist = ['Urinary tract infection', 'Dimorphic hemmorhoids(piles)']
    Dermatologist = ['Acne', 'Chicken pox', 'Fungal infection', 'Psoriasis', 'Impetigo']
    Gastroenterologist = ['Peptic ulcer diseae', 'GERD', 'Chronic cholestasis',
                          'Alcoholic hepatitis', 'Jaundice', 'hepatitis A',
                          'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E']

    if predicted_disease in Rheumatologist:
        consultdoctor = "Rheumatologist"
    elif predicted_disease in Cardiologist:
        consultdoctor = "Cardiologist"
    elif predicted_disease in ENT_specialist:
        consultdoctor = "ENT specialist"
    elif predicted_disease in Neurologist:
        consultdoctor = "Neurologist"
    elif predicted_disease in Allergist_Immunologist:
        consultdoctor = "Allergist/Immunologist"
    elif predicted_disease in Urologist:
        consultdoctor = "Urologist"
    elif predicted_disease in Dermatologist:
        consultdoctor = "Dermatologist"
    elif predicted_disease in Gastroenterologist:
        consultdoctor = "Gastroenterologist"
    else:
        consultdoctor = "General Physician"

    # Save results in DB
    Predicted_Diseases.objects.all().delete()
    Predicted_Diseases.objects.create(
        diseases=pd_labels,
        diseases_prob=pd_prob,
        consult_doctor=consultdoctor
    )

    # Send clean response
    return Response({
        "predicted": predicted_disease,
        "doctor": consultdoctor,
        "top5": [
            {"disease": d, "prob": p}
            for d, p in zip(pd_labels, pd_prob)
        ]
    })
