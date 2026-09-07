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
      assignedTo: "Sanitation Department",
      description:
        "Garbage has not been collected for several days."
    },
    {
      id: 2,
      title: "Street light not working",
      location: "Vijayanagar",
      status: "In Progress",
      assignedTo: "Electrical Department",
      description:
        "The street light has not been working properly."
    },
    {
      id: 3,
      title: "Road damage",
      location: "Hebbal",
      status: "Resolved",
      assignedTo: "Road Maintenance Department",
      description:
        "The road is damaged and needs repair."
    }
  ]);

  /* =========================
     FILTER ISSUES
  ========================= */

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      issue.location
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      issue.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* =========================
     STATISTICS
  ========================= */

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

  /* =========================
     CHANGE STATUS
  ========================= */

  const changeStatus = (newStatus) => {
    setSelectedIssue({
      ...selectedIssue,
      status: newStatus
    });

    setIssues(
      issues.map((issue) =>
        issue.id === selectedIssue.id
          ? { ...issue, status: newStatus }
          : issue
      )
    );
  };

  /* =========================
     CHANGE DEPARTMENT
  ========================= */

  const changeDepartment = (newDepartment) => {
    setSelectedIssue({
      ...selectedIssue,
      assignedTo: newDepartment
    });

    setIssues(
      issues.map((issue) =>
        issue.id === selectedIssue.id
          ? {
              ...issue,
              assignedTo: newDepartment
            }
          : issue
      )
    );
  };

  return (
    <div className="admin-dashboard">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        <h2>Admin Panel</h2>

        <nav>
          <ul>

            <li
              className={
                activePage === "dashboard"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setActivePage("dashboard");
                setStatusFilter("All");
              }}
            >
              Dashboard
            </li>

            <li
              className={
                activePage === "all"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setActivePage("all");
                setStatusFilter("All");
              }}
            >
              All Issues
            </li>

            <li
              className={
                activePage === "pending"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setActivePage("pending");
                setStatusFilter("Pending");
              }}
            >
              Pending Issues
            </li>

            <li
              className={
                activePage === "in-progress"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setActivePage("in-progress");
                setStatusFilter("In Progress");
              }}
            >
              In Progress
            </li>

            <li
              className={
                activePage === "resolved"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setActivePage("resolved");
                setStatusFilter("Resolved");
              }}
            >
              Resolved Issues
            </li>

            <li
              className={
                activePage === "users"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setActivePage("users");
              }}
            >
              Users
            </li>

            <li>
              Logout
            </li>

          </ul>
        </nav>

      </aside>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="main-content">

        {/* USERS PAGE */}

        {activePage === "users" ? (

          <UserManagement />

        ) : (

          <>

            {/* PAGE TITLE */}

            <h1>
              {activePage === "dashboard" &&
                "Admin Dashboard"}

              {activePage === "all" &&
                "All Issues"}

              {activePage === "pending" &&
                "Pending Issues"}

              {activePage === "in-progress" &&
                "In Progress Issues"}

              {activePage === "resolved" &&
                "Resolved Issues"}
            </h1>


            {/* =========================
                DASHBOARD PAGE
            ========================= */}

            {activePage === "dashboard" && (

              <div className="dashboard-content">

                <h2>
                  Welcome, Admin
                </h2>

                <p>
                  Manage and monitor community issues
                  from here.
                </p>


                {/* SEARCH & FILTER */}

                <div className="search-filter">

                  <input
                    type="text"
                    placeholder="Search issues..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                  />

                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value)
                    }
                  >

                    <option value="All">
                      All Status
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>

                  </select>

                </div>


                {/* STATISTICS CARDS */}

                <div className="stats-container">

                  <div className="stat-card">
                    <h3>Total Issues</h3>
                    <p>{totalIssues}</p>
                  </div>

                  <div className="stat-card">
                    <h3>Pending</h3>
                    <p>{pendingIssues}</p>
                  </div>

                  <div className="stat-card">
                    <h3>In Progress</h3>
                    <p>{inProgressIssues}</p>
                  </div>

                  <div className="stat-card">
                    <h3>Resolved</h3>
                    <p>{resolvedIssues}</p>
                  </div>

                </div>


                {/* RECENT ISSUES */}

                <div className="recent-issues">

                  <h2>
                    Recent Issues
                  </h2>

                  <table>

                    <thead>

                      <tr>
                        <th>Issue</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>

                    </thead>

                    <tbody>

                      {filteredIssues.map((issue) => (

                        <tr key={issue.id}>

                          <td>
                            {issue.title}
                          </td>

                          <td>
                            {issue.location}
                          </td>

                          <td>

                            <span
                              className={`status ${issue.status
                                .toLowerCase()
                                .replace(" ", "-")}`}
                            >
                              {issue.status}
                            </span>

                          </td>

                          <td>

                            <button
                              onClick={() =>
                                setSelectedIssue(issue)
                              }
                            >
                              View
                            </button>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            )}


            {/* =========================
                ALL / PENDING /
                IN PROGRESS / RESOLVED
                ISSUES
            ========================= */}

            {activePage !== "dashboard" && (

              <div className="dashboard-content">

                {/* SEARCH & FILTER */}

                <div className="search-filter">

                  <input
                    type="text"
                    placeholder="Search issues..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                  />

                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value)
                    }
                  >

                    <option value="All">
                      All Status
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>

                  </select>

                </div>


                {/* ISSUE TABLE */}

                <div className="recent-issues">

                  <h2>
                    {activePage === "all" &&
                      "All Issues"}

                    {activePage === "pending" &&
                      "Pending Issues"}

                    {activePage === "in-progress" &&
                      "In Progress Issues"}

                    {activePage === "resolved" &&
                      "Resolved Issues"}
                  </h2>

                  <table>

                    <thead>

                      <tr>
                        <th>Issue</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>

                    </thead>

                    <tbody>

                      {filteredIssues.map((issue) => (

                        <tr key={issue.id}>

                          <td>
                            {issue.title}
                          </td>

                          <td>
                            {issue.location}
                          </td>

                          <td>

                            <span
                              className={`status ${issue.status
                                .toLowerCase()
                                .replace(" ", "-")}`}
                            >
                              {issue.status}
                            </span>

                          </td>

                          <td>

                            <button
                              onClick={() =>
                                setSelectedIssue(issue)
                              }
                            >
                              View
                            </button>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            )}


            {/* =========================
                ISSUE DETAILS
            ========================= */}

            {selectedIssue && (

              <div className="issue-details">

                <h2>
                  Issue Details
                </h2>


                <p>
                  <strong>
                    Issue:
                  </strong>{" "}
                  {selectedIssue.title}
                </p>


                <p>
                  <strong>
                    Location:
                  </strong>{" "}
                  {selectedIssue.location}
                </p>


                <p>

                  <strong>
                    Assigned To:
                  </strong>{" "}

                  <select
                    value={
                      selectedIssue.assignedTo
                    }
                    onChange={(e) =>
                      changeDepartment(
                        e.target.value
                      )
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

                    <option value="Water Department">
                      Water Department
                    </option>

                  </select>

                </p>


                <p>

                  <strong>
                    Status:
                  </strong>{" "}

                  <select
                    value={
                      selectedIssue.status
                    }
                    onChange={(e) =>
                      changeStatus(
                        e.target.value
                      )
                    }
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>

                  </select>

                </p>


                <p>

                  <strong>
                    Description:
                  </strong>{" "}

                  {selectedIssue.description}

                </p>


                <button
                  onClick={() =>
                    setSelectedIssue(null)
                  }
                >
                  Close
                </button>

              </div>

            )}

          </>

        )}

      </main>

    </div>
  );
}

export default AdminDashboard;