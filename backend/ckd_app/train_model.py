import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report


# Load dataset
df = pd.read_csv("ckd_app/dataset/kidney_disease.csv")

# Drop ID column if exists
if "id" in df.columns:
    df.drop("id", axis=1, inplace=True)

# Rename target column if needed
if "classification" in df.columns:
    df.rename(columns={"classification": "target"}, inplace=True)

# Replace '?' with NaN
df.replace("?", np.nan, inplace=True)

# Fill missing values
for col in df.columns:
    if df[col].dtype == "object":
        df[col] = df[col].fillna(df[col].mode()[0])
    else:
        df[col] = df[col].fillna(df[col].mean())

# Encode categorical columns
label_encoders = {}
for col in df.columns:
    if df[col].dtype == "object":
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le

# Split features and target
X = df.drop("target", axis=1)
y = df["target"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train Logistic Regression
model = LogisticRegression(max_iter=2000)
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Accuracy
acc = accuracy_score(y_test, y_pred)
print("Model Accuracy:", acc)

print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

# Save model
joblib.dump(model, "ckd_app/ckd_model.pkl")
print("\nModel saved as ckd_model.pkl")

# Save encoders
joblib.dump(label_encoders, "ckd_app/label_encoders.pkl")
print("Label encoders saved as label_encoders.pkl")
