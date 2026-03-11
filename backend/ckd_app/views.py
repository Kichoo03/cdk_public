from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.http import FileResponse

from .models import Patient, Prediction
from .serializers import PatientSerializer, PredictionSerializer
from .ml_model import predict_ckd
from .pdf_report import generate_ckd_pdf


@api_view(["GET"])
def home(request):
    return Response({"message": "CKD Prediction Backend is Running ✅"})


@api_view(["POST"])
def create_patient(request):
    serializer = PatientSerializer(data=request.data)

    if serializer.is_valid():
        patient = serializer.save()
        return Response(PatientSerializer(patient).data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def predict_patient_ckd(request):
    """
    Takes patient details from React,
    stores patient in DB,
    predicts CKD using ML model,
    stores prediction in DB,
    returns prediction + report.
    """

    serializer = PatientSerializer(data=request.data)

    if serializer.is_valid():
        patient = serializer.save()

        features = serializer.validated_data

        # ML Prediction + Report Generation
        result, probability, report = predict_ckd(features)

        # Save prediction to DB
        prediction = Prediction.objects.create(
            patient=patient,
            result=result,
            probability=probability,
            report=report
        )

        return Response({
            "patient": PatientSerializer(patient).data,
            "prediction": PredictionSerializer(prediction).data,
            "report": report
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def prediction_history(request):
    predictions = Prediction.objects.all().order_by("-created_at")
    serializer = PredictionSerializer(predictions, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def dashboard_summary(request):
    total = Prediction.objects.count()
    ckd_count = Prediction.objects.filter(result="CKD").count()
    not_ckd_count = Prediction.objects.filter(result="NOT_CKD").count()

    latest = Prediction.objects.all().order_by("-created_at")[:5]
    latest_data = PredictionSerializer(latest, many=True).data

    return Response({
        "total_predictions": total,
        "ckd_count": ckd_count,
        "not_ckd_count": not_ckd_count,
        "latest_predictions": latest_data
    })


@api_view(["GET"])
def download_report(request, prediction_id):
    """
    Downloads CKD prediction report as PDF.
    """

    try:
        prediction = Prediction.objects.get(id=prediction_id)
        patient = prediction.patient

        report = prediction.report if prediction.report else {}

        pdf_buffer = generate_ckd_pdf(patient, prediction, report)

        return FileResponse(
            pdf_buffer,
            as_attachment=True,
            filename=f"{patient.name}_CKD_Report.pdf"
        )

    except Prediction.DoesNotExist:
        return Response({"error": "Prediction not found"}, status=404)
