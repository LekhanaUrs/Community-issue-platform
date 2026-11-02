import { useState } from "react";
import UserManagement from "./UserManagement";

function AdminDashboard() {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Garbage not collected",
      location: "Kuvempunagar",
      status: "Pending",
      department: "Sanitation Department",
      reportedBy: "Rahul",
      date: "02 Oct 2026",
      description:
        "Garbage has not been collected from the area for the past few days. This is causing an unpleasant smell and creating hygiene problems for residents.",
    },
    {
      id: 2,
      title: "Street light not working",
      location: "Vijayanagar",
      status: "In Progress",
      department: "Electrical Department",
      reportedBy: "Priya",
      date: "01 Oct 2026",
      description:
        "The street light near the main road is not working at night. Residents are facing difficulty while travelling through this area.",
    },
    {
      id: 3,
      title: "Road damage",
      location: "Hebbal",
      status: "Resolved",
      department: "Road Maintenance Department",
      reportedBy: "Arjun",
      date: "28 Sep 2026",
      description:
        "There is a damaged portion of the road which was causing difficulty for vehicles and pedestrians.",
    },
  ]);

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || issue.status === statusFilter;

    return matchesSearch && matchesStatus;
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

  const changeStatus = (newStatus) => {
    if (!selectedIssue) return;

    const updatedIssue = {
      ...selectedIssue,
      status: newStatus,
    };

    setIssues((currentIssues) =>
      currentIssues.map((issue) =>
        issue.id === selectedIssue.id ? updatedIssue : issue
      )
    );

    setSelectedIssue(updatedIssue);
  };

  const changeDepartment = (newDepartment) => {
    if (!selectedIssue) return;

    const updatedIssue = {
      ...selectedIssue,
      department: newDepartment,
    };

    setIssues((currentIssues) =>
      currentIssues.map((issue) =>
        issue.id === selectedIssue.id ? updatedIssue : issue
      )
    );

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
            className={activePage === "dashboard" ? "nav-item active" : "nav-item"}
            onClick={() => {
              setActivePage("dashboard");
              setSelectedIssue(null);
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
            className={activePage === "pending" ? "nav-item active" : "nav-item"}
            onClick={() => {
              setActivePage("pending");
              setSelectedIssue(null);
              setStatusFilter("Pending");
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
              setStatusFilter("In Progress");
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
              setStatusFilter("Resolved");
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

                          <td>{issue.department}</td>

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

            {/* Issue Details */}
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
                      <strong>{selectedIssue.date}</strong>
                    </div>

                    <div className="detail-item">
                      <span>👤 Reported By</span>
                      <strong>{selectedIssue.reportedBy}</strong>
                    </div>

                    <div className="detail-item">
                      <span>🏢 Department</span>

                      <select
                        value={selectedIssue.department}
                        onChange={(event) =>
                          changeDepartment(event.target.value)
                        }
                      >
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
                        value={selectedIssue.status}
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
                    <p>{selectedIssue.description}</p>
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