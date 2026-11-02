import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/login";
import ReportIssue from "./pages/reportissue";
import ViewIssues from "./pages/viewissues";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report-issue" element={<ReportIssue />} />
        <Route path="/view-issues" element={<ViewIssues />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;