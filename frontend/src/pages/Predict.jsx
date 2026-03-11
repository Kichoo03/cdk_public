import { useState } from "react";
import API from "../api/api";

function Predict() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    blood_pressure: "",
    blood_glucose: "",
    blood_urea: "",
    serum_creatinine: "",
    sodium: "",
    potassium: "",
    hemoglobin: "",
    diabetes: false,
    hypertension: false,
    anemia: false,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit Prediction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await API.post("predict/", {
        ...formData,
        age: parseInt(formData.age),
        blood_pressure: parseFloat(formData.blood_pressure),
        blood_glucose: parseFloat(formData.blood_glucose),
        blood_urea: parseFloat(formData.blood_urea),
        serum_creatinine: parseFloat(formData.serum_creatinine),
        sodium: parseFloat(formData.sodium),
        potassium: parseFloat(formData.potassium),
        hemoglobin: parseFloat(formData.hemoglobin),
      });

      setResult(response.data);
    } catch (error) {
      console.log(error);
      alert("Prediction Failed! Check Django backend is running.");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="fw-bold text-center">CKD Prediction Form</h3>
        <p className="text-center text-muted">
          Enter patient medical details to predict Chronic Kidney Disease.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="row">
            {/* Name */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Patient Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Age */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            {/* Blood Pressure */}
            <div className="col-md-4 mb-3">
              <label className="form-label">Blood Pressure</label>
              <input
                type="number"
                className="form-control"
                name="blood_pressure"
                value={formData.blood_pressure}
                onChange={handleChange}
                required
              />
            </div>

            {/* Blood Glucose */}
            <div className="col-md-4 mb-3">
              <label className="form-label">Blood Glucose</label>
              <input
                type="number"
                className="form-control"
                name="blood_glucose"
                value={formData.blood_glucose}
                onChange={handleChange}
                required
              />
            </div>

            {/* Blood Urea */}
            <div className="col-md-4 mb-3">
              <label className="form-label">Blood Urea</label>
              <input
                type="number"
                className="form-control"
                name="blood_urea"
                value={formData.blood_urea}
                onChange={handleChange}
                required
              />
            </div>

            {/* Creatinine */}
            <div className="col-md-4 mb-3">
              <label className="form-label">Serum Creatinine</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="serum_creatinine"
                value={formData.serum_creatinine}
                onChange={handleChange}
                required
              />
            </div>

            {/* Sodium */}
            <div className="col-md-4 mb-3">
              <label className="form-label">Sodium</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="sodium"
                value={formData.sodium}
                onChange={handleChange}
                required
              />
            </div>

            {/* Potassium */}
            <div className="col-md-4 mb-3">
              <label className="form-label">Potassium</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="potassium"
                value={formData.potassium}
                onChange={handleChange}
                required
              />
            </div>

            {/* Hemoglobin */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Hemoglobin</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="hemoglobin"
                value={formData.hemoglobin}
                onChange={handleChange}
                required
              />
            </div>

            {/* Conditions */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Medical Conditions</label>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="diabetes"
                  checked={formData.diabetes}
                  onChange={handleChange}
                />
                <label className="form-check-label">Diabetes</label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="hypertension"
                  checked={formData.hypertension}
                  onChange={handleChange}
                />
                <label className="form-check-label">Hypertension</label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="anemia"
                  checked={formData.anemia}
                  onChange={handleChange}
                />
                <label className="form-check-label">Anemia</label>
              </div>
            </div>
          </div>

          <button className="btn btn-primary w-100 mt-3" disabled={loading}>
            {loading ? "Predicting..." : "Predict CKD"}
          </button>
        </form>

        {/* RESULT */}
        {result && (
          <div className="mt-4">
            <div
              className={`alert ${
                result.prediction.result === "CKD"
                  ? "alert-danger"
                  : "alert-success"
              }`}
            >
              <h4 className="fw-bold">Prediction Result</h4>
              <p className="mb-1">
                <b>Status:</b> {result.prediction.result}
              </p>
              <p className="mb-1">
                <b>Probability:</b> {result.prediction.probability}
              </p>
            </div>

            {/* REPORT */}
            {result.report && (
              <div className="card shadow-sm p-3 mt-3">
                <h4 className="fw-bold">Auto Generated Report</h4>

                <p className="mt-2">
                  <b>Risk Level:</b>{" "}
                  <span className="badge bg-warning text-dark">
                    {result.report.risk_level}
                  </span>
                </p>

                <h6 className="fw-bold mt-3">Reasons:</h6>
                <ul>
                  {result.report.reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* DOWNLOAD BUTTON */}
            <a
              href={`https://cdk-jppf.onrender.com/api/download-report/${result.prediction.id}/`}
              className="btn btn-success w-100 mt-3"
              target="_blank"
              rel="noreferrer"
            >
              Download Report (PDF)
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Predict;
