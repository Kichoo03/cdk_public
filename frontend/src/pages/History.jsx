import { useEffect, useState } from "react";
import API from "../api/api";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await API.get("history/");
      setHistory(response.data);
    } catch (error) {
      console.log(error);
      alert("Error fetching history. Check backend server!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="fw-bold text-center">Prediction History</h3>

        <table className="table table-bordered table-striped mt-4">
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
            {history.length > 0 ? (
              history.map((item) => (
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
                  No history available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
