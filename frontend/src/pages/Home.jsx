import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function Home() {
  const [summary, setSummary] = useState({
    total_predictions: 0,
    ckd_count: 0,
    not_ckd_count: 0,
    latest_predictions: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await API.get("dashboard/");
      setSummary(response.data);
    } catch (error) {
      console.log(error);
      alert("Dashboard not loading. Check backend API!");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-center">
        Chronic Kidney Disease Prediction Dashboard
      </h2>
      <p className="text-center text-muted">
        Machine Learning based CKD prediction system using Logistic Regression / CNN.
      </p>

      {/* Summary Cards */}
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-3 text-center">
            <h5 className="fw-bold">Total Predictions</h5>
            <h2 className="text-primary">{summary.total_predictions}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-3 text-center">
            <h5 className="fw-bold">CKD Detected</h5>
            <h2 className="text-danger">{summary.ckd_count}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-3 text-center">
            <h5 className="fw-bold">Not CKD</h5>
            <h2 className="text-success">{summary.not_ckd_count}</h2>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="text-center mt-4">
        <Link to="/predict" className="btn btn-primary mx-2 px-4">
          Predict CKD
        </Link>

        <Link to="/history" className="btn btn-dark mx-2 px-4">
          View History
        </Link>
      </div>

      {/* Latest Predictions */}
      <div className="card shadow mt-5 p-4">
        <h4 className="fw-bold text-center">Latest Predictions</h4>

        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Result</th>
              <th>Probability</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {summary.latest_predictions.length > 0 ? (
              summary.latest_predictions.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.patient.name}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.result === "CKD" ? "bg-danger" : "bg-success"
                      }`}
                    >
                      {item.result}
                    </span>
                  </td>
                  <td>{item.probability}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No predictions yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
