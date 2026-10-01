import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ReportIssue from "./pages/reportissue";
import ViewIssues from "./pages/viewissues";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login + Registration */}
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        {/* Report Issue */}
        <Route path="/report-issue" element={<ReportIssue />} />

        <Route path="/view-issues" element={<ViewIssues />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;