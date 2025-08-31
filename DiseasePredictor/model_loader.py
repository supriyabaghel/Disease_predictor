import joblib
from pathlib import Path

_model = None

def get_model():
    global _model
    if _model is None:
        # Go up one level from DiseasePredictor/ to Application/
        path = Path(__file__).resolve().parent.parent / "model.pkl"
        _model = joblib.load(path)
    return _model
