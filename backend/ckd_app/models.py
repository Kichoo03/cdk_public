from django.db import models


class Patient(models.Model):
    name = models.CharField(max_length=200)
    age = models.IntegerField()

    blood_pressure = models.FloatField()
    blood_glucose = models.FloatField()
    blood_urea = models.FloatField()
    serum_creatinine = models.FloatField()

    sodium = models.FloatField()
    potassium = models.FloatField()
    hemoglobin = models.FloatField()

    diabetes = models.BooleanField(default=False)
    hypertension = models.BooleanField(default=False)
    anemia = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Prediction(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="predictions")

    result = models.CharField(max_length=50)  # CKD or NOT_CKD
    probability = models.FloatField(default=0.0)

    report = models.JSONField(null=True, blank=True)  # ✅ report saved here

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient.name} - {self.result}"
