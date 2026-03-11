from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),

    path("patient/create/", views.create_patient, name="create_patient"),

    path("predict/", views.predict_patient_ckd, name="predict_ckd"),

    path("history/", views.prediction_history, name="prediction_history"),

    path("dashboard/", views.dashboard_summary, name="dashboard_summary"),

    path("download-report/<int:prediction_id>/", views.download_report, name="download_report"),
]
