from django.core.exceptions import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import PatientProfile, Predicted_Diseases, DoctorProfile

UserModel = get_user_model()


# -----------------------------
# User Registration
# -----------------------------
class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def create(self, validated_data):
        user_obj = UserModel.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        user_obj.username = validated_data['username']
        user_obj.save()
        return user_obj


# -----------------------------
# User Login
# -----------------------------
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, validated_data):
        user = authenticate(
            username=validated_data['email'],
            password=validated_data['password']
        )
        if not user:
            raise ValidationError('User not found')
        return user


# -----------------------------
# User Serializer (basic info)
# -----------------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'username')


# -----------------------------
# Patient Profile
# -----------------------------
class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientProfile
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        profile = PatientProfile.objects.create(user=user, **validated_data)
        return profile

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


# -----------------------------
# Prediction Model Serializer
# -----------------------------
class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Predicted_Diseases
        fields = ('diseases', 'diseases_prob', 'consult_doctor')


# -----------------------------
# Doctor Profile
# -----------------------------
class DoctorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorProfile
        fields = '__all__'
