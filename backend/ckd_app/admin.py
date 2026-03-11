from django.contrib import admin
from .models import Patient, Prediction

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "age", "diabetes", "hypertension", "created_at")
    search_fields = ("name",)

@admin.register(Prediction)
class PredictionAdmin(admin.ModelAdmin):
    list_display = ("id", "patient", "result", "probability", "created_at")
    list_filter = ("result",)
