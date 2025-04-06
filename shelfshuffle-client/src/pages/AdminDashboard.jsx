import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reports")
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.id} className="border p-2 mb-2">
            <p><strong>Reported Book:</strong> {report.bookTitle}</p>
            <p><strong>Reason:</strong> {report.reason}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;