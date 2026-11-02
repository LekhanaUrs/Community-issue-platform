import { useEffect, useState } from "react";
import UserManagement from "./UserManagement";

function AdminDashboard() {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [issues, setIssues] = useState([]);

  // Load issues saved by the Report Issue page.
  useEffect(() => {
    try {
      const savedIssues = JSON.parse(
        localStorage.getItem("communityIssues") || "[]"
      );

      setIssues(Array.isArray(savedIssues) ? savedIssues : []);
    } catch (error) {
      console.error("Unable to load community issues:", error);
      setIssues([]);
    }
  }, []);

  // Save updated issues to localStorage.
  const saveIssues = (updatedIssues) => {
    setIssues(updatedIssues);

    localStorage.setItem(
      "communityIssues",
      JSON.stringify(updatedIssues)
    );
  };

  const filteredIssues = issues.filter((issue) => {
    const title = (issue.title || "").toLowerCase();
    const location = (issue.location || "").toLowerCase();

    const matchesSearch =
      title.includes(searchTerm.toLowerCase()) ||
      location.includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || issue.status === statusFilter;

    const matchesPage =
      activePage === "pending"
        ? issue.status === "Pending"
        : activePage === "in-progress"
        ? issue.status === "In Progress"
        : activePage === "resolved"
        ? issue.status === "Resolved"
        : true;

    return matchesSearch && matchesStatus && matchesPage;
  });

  const totalIssues = issues.length;

  const pendingIssues = issues.filter(
    (issue) => issue.status === "Pending"
  ).length;

  const inProgressIssues = issues.filter(
    (issue) => issue.status === "In Progress"
  ).length;

  const resolvedIssues = issues.filter(
    (issue) => issue.status === "Resolved"
  ).length;

  // Update issue status and save it.
  const changeStatus = (newStatus) => {
    if (!selectedIssue) return;

    const updatedIssue = {
      ...selectedIssue,
      status: newStatus,
    };

    const updatedIssues = issues.map((issue) =>
      issue.id === selectedIssue.id ? updatedIssue : issue
    );

    saveIssues(updatedIssues);
    setSelectedIssue(updatedIssue);
  };

  // Update department and save it.
  const changeDepartment = (newDepartment) => {
    if (!selectedIssue) return;

    const updatedIssue = {
      ...selectedIssue,
      department: newDepartment,
    };

    const updatedIssues = issues.map((issue) =>
      issue.id === selectedIssue.id ? updatedIssue : issue
    );

    saveIssues(updatedIssues);
    setSelectedIssue(updatedIssue);
  };

  const getStatusClass = (status) => {
    if (status === "Pending") return "status pending";
    if (status === "In Progress") return "status in-progress";
    if (status === "Resolved") return "status resolved";
    if (status === "Rejected") return "status rejected";

    return "status";
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>Community</h2>
          <span>Connect</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={
              activePage === "dashboard" ? "nav-item active" : "nav-item"
            }
            onClick={() => {
              setActivePage("dashboard");
              setSelectedIssue(null);
              setStatusFilter("All");
            }}
          >
            🏠 Dashboard
          </button>

          <button
            className={activePage === "all" ? "nav-item active" : "nav-item"}
            onClick={() => {
              setActivePage("all");
              setSelectedIssue(null);
              setStatusFilter("All");
            }}
          >
            📋 All Issues
          </button>

          <button
            className={
              activePage === "pending" ? "nav-item active" : "nav-item"
            }
            onClick={() => {
              setActivePage("pending");
              setSelectedIssue(null);
              setStatusFilter("All");
            }}
          >
            ⏳ Pending Issues
          </button>

          <button
            className={
              activePage === "in-progress"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => {
              setActivePage("in-progress");
              setSelectedIssue(null);
              setStatusFilter("All");
            }}
          >
            🔄 In Progress
          </button>

          <button
            className={
              activePage === "resolved" ? "nav-item active" : "nav-item"
            }
            onClick={() => {
              setActivePage("resolved");
              setSelectedIssue(null);
              setStatusFilter("All");
            }}
          >
            ✅ Resolved Issues
          </button>

          <button
            className={activePage === "users" ? "nav-item active" : "nav-item"}
            onClick={() => {
              setActivePage("users");
              setSelectedIssue(null);
            }}
          >
            👥 Users
          </button>

          <button
            className="nav-item logout-nav"
            onClick={() => alert("Logout functionality will be added later.")}
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="admin-header">
          <div className="header-left">
            <h2>Community Connect</h2>
          </div>

          <div className="header-right">
            <span className="notification">🔔</span>
            <span className="admin-name">Admin</span>

            <button
              className="logout-button"
              onClick={() =>
                alert("Logout functionality will be added later.")
              }
            >
              Logout
            </button>
          </div>
        </header>

        {/* Users Page */}
        {activePage === "users" ? (
          <UserManagement />
        ) : (
          <>
            {/* Welcome Section */}
            <section className="welcome-section">
              <div>
                <h1>
                  {activePage === "dashboard"
                    ? "Welcome, Admin! 👋"
                    : activePage === "all"
                    ? "All Issues"
                    : activePage === "pending"
                    ? "Pending Issues"
                    : activePage === "in-progress"
                    ? "Issues In Progress"
                    : "Resolved Issues"}
                </h1>

                <p>
                  Manage and monitor community issues from one place.
                </p>
              </div>
            </section>

            {/* Search and Filter */}
            <section className="controls-section">
              <div className="search-box">
                <span>🔍</span>

                <input
                  type="text"
                  placeholder="Search by issue or location..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </section>

            {/* Statistics */}
            <section className="stats-container">
              <div className="stat-card">
                <div className="stat-icon">📋</div>
                <div>
                  <h3>{totalIssues}</h3>
                  <p>Total Issues</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">⏳</div>
                <div>
                  <h3>{pendingIssues}</h3>
                  <p>Pending</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🔄</div>
                <div>
                  <h3>{inProgressIssues}</h3>
                  <p>In Progress</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div>
                  <h3>{resolvedIssues}</h3>
                  <p>Resolved</p>
                </div>
              </div>
            </section>

            {/* Issues Table */}
            <section className="issues-section">
              <div className="section-header">
                <h2>
                  {activePage === "dashboard"
                    ? "Recent Issues"
                    : "Issues List"}
                </h2>

                <span className="issue-count">
                  {filteredIssues.length} issue(s)
                </span>
              </div>

              {filteredIssues.length === 0 ? (
                <div className="no-issues">
                  <p>No issues found.</p>
                </div>
              ) : (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Issue</th>
                        <th>Location</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredIssues.map((issue) => (
                        <tr key={issue.id}>
                          <td>
                            <strong>{issue.title}</strong>
                          </td>

                          <td>{issue.location}</td>

                          <td>{issue.department || "Not assigned"}</td>

                          <td>
                            <span className={getStatusClass(issue.status)}>
                              {issue.status}
                            </span>
                          </td>

                          <td>
                            <button
                              className="view-button"
                              onClick={() => setSelectedIssue(issue)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* Issue Details Modal */}
            {selectedIssue && (
              <div className="modal-overlay">
                <div className="issue-modal">
                  <div className="modal-header">
                    <div>
                      <span className="modal-label">ISSUE DETAILS</span>
                      <h2>{selectedIssue.title}</h2>
                    </div>

                    <button
                      className="close-button"
                      onClick={() => setSelectedIssue(null)}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="issue-details-grid">
                    <div className="detail-item">
                      <span>📍 Location</span>
                      <strong>{selectedIssue.location}</strong>
                    </div>

                    <div className="detail-item">
                      <span>📅 Reported Date</span>
                      <strong>{selectedIssue.date || "Not available"}</strong>
                    </div>

                    <div className="detail-item">
                      <span>👤 Reported By</span>
                      <strong>{selectedIssue.reportedBy || "Not available"}</strong>
                    </div>

                    <div className="detail-item">
                      <span>🏢 Department</span>

                      <select
                        value={selectedIssue.department || ""}
                        onChange={(event) =>
                          changeDepartment(event.target.value)
                        }
                      >
                        <option value="">Not assigned</option>
                        <option value="Sanitation Department">
                          Sanitation Department
                        </option>
                        <option value="Electrical Department">
                          Electrical Department
                        </option>
                        <option value="Road Maintenance Department">
                          Road Maintenance Department
                        </option>
                        <option value="Water Supply Department">
                          Water Supply Department
                        </option>
                        <option value="Public Works Department">
                          Public Works Department
                        </option>
                      </select>
                    </div>

                    <div className="detail-item">
                      <span>🔄 Current Status</span>

                      <select
                        value={selectedIssue.status || "Pending"}
                        onChange={(event) =>
                          changeStatus(event.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  <div className="description-section">
                    <h3>Issue Description</h3>
                    <p>{selectedIssue.description || "No description provided."}</p>
                  </div>

                  <div className="modal-footer">
                    <button
                      className="close-modal-button"
                      onClick={() => setSelectedIssue(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;