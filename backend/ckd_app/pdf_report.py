from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
import io


def generate_ckd_pdf(patient, prediction, report):
    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)

    width, height = A4

    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawString(150, height - 50, "CKD Prediction Report")

    pdf.setFont("Helvetica", 12)

    pdf.drawString(50, height - 100, f"Patient Name: {patient.name}")
    pdf.drawString(50, height - 120, f"Age: {patient.age}")
    pdf.drawString(50, height - 140, f"Blood Pressure: {patient.blood_pressure}")
    pdf.drawString(50, height - 160, f"Blood Glucose: {patient.blood_glucose}")
    pdf.drawString(50, height - 180, f"Blood Urea: {patient.blood_urea}")
    pdf.drawString(50, height - 200, f"Serum Creatinine: {patient.serum_creatinine}")
    pdf.drawString(50, height - 220, f"Sodium: {patient.sodium}")
    pdf.drawString(50, height - 240, f"Potassium: {patient.potassium}")
    pdf.drawString(50, height - 260, f"Hemoglobin: {patient.hemoglobin}")

    pdf.drawString(50, height - 290, f"Diabetes: {'Yes' if patient.diabetes else 'No'}")
    pdf.drawString(50, height - 310, f"Hypertension: {'Yes' if patient.hypertension else 'No'}")
    pdf.drawString(50, height - 330, f"Anemia: {'Yes' if patient.anemia else 'No'}")

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(50, height - 370, "Prediction Result:")

    pdf.setFont("Helvetica", 12)
    pdf.drawString(50, height - 400, f"Status: {prediction.result}")
    pdf.drawString(50, height - 420, f"Probability: {prediction.probability}")
    pdf.drawString(50, height - 440, f"Risk Level: {report.get('risk_level', 'N/A')}")

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(50, height - 480, "Reasons:")

    pdf.setFont("Helvetica", 12)

    y = height - 510
    reasons = report.get("reasons", [])

    for reason in reasons:
        pdf.drawString(70, y, f"- {reason}")
        y -= 20

        if y < 100:
            pdf.showPage()
            pdf.setFont("Helvetica", 12)
            y = height - 100

    pdf.setFont("Helvetica-Oblique", 10)
    pdf.drawString(50, 50, "Note: This report is generated using Machine Learning and needs doctor verification.")

    pdf.showPage()
    pdf.save()

    buffer.seek(0)
    return buffer
