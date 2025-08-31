from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

UserModel = get_user_model()


# -----------------------------
# Custom validation (for registration)
# -----------------------------
def custom_validation(data):
    email = data['email'].strip()
    username = data['username'].strip()
    password = data['password'].strip()

    # Email check
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('Choose another email')

    # Password check
    if not password or len(password) < 8:
        raise ValidationError('Choose another password (min 8 characters)')

    # Username check
    if not username:
        raise ValidationError('Choose another username')

    return data


# -----------------------------
# Individual validators
# -----------------------------
def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('An email is needed')
    return True


def validate_username(data):
    username = data['username'].strip()
    if not username:
        raise ValidationError('Choose another username')
    return True


def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('A password is needed')
    return True
