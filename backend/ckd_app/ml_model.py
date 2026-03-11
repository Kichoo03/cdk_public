import joblib
import numpy as np
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "ckd_model.pkl")

# Load trained ML model
model = joblib.load(model_path)


def generate_report(features, result, probability):
    reasons = []

    # Medical Threshold Checking (Explainable AI)
    if features["serum_creatinine"] > 1.3:
        reasons.append(f"High Serum Creatinine ({features['serum_creatinine']})")

    if features["blood_urea"] > 40:
        reasons.append(f"High Blood Urea ({features['blood_urea']})")

    if features["blood_glucose"] > 140:
        reasons.append(f"High Blood Glucose ({features['blood_glucose']})")

    if features["blood_pressure"] > 90:
        reasons.append(f"High Blood Pressure ({features['blood_pressure']})")

    if features["hemoglobin"] < 11:
        reasons.append(f"Low Hemoglobin ({features['hemoglobin']})")

    if features["sodium"] > 145:
        reasons.append(f"High Sodium ({features['sodium']})")

    if features["potassium"] > 5.5:
        reasons.append(f"High Potassium ({features['potassium']})")

    if features["diabetes"]:
        reasons.append("Patient has Diabetes")

    if features["hypertension"]:
        reasons.append("Patient has Hypertension")

    if features["anemia"]:
        reasons.append("Patient has Anemia")

    # Risk Level based on probability
    if probability >= 0.85:
        risk_level = "HIGH RISK"
    elif probability >= 0.65:
        risk_level = "MEDIUM RISK"
    else:
        risk_level = "LOW RISK"

    if len(reasons) == 0:
        reasons.append("All values are in normal range")

    return {
        "result": result,
        "probability": probability,
        "risk_level": risk_level,
        "reasons": reasons
    }


def predict_ckd(features: dict):
    input_data = np.array([[
        features["age"],
        features["blood_pressure"],
        features["blood_glucose"],
        features["blood_urea"],
        features["serum_creatinine"],
        features["sodium"],
        features["potassium"],
        features["hemoglobin"],
        int(features["diabetes"]),
        int(features["hypertension"]),
        int(features["anemia"])
    ]])

    prediction = model.predict(input_data)[0]
    probability = model.predict_proba(input_data).max()

    probability = round(float(probability), 2)

    result = "CKD" if prediction == 1 else "NOT_CKD"

    report = generate_report(features, result, probability)

    return result, probability, report
