
import { useState } from "react";

function AdminDashboard() {
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Garbage not collected",
      location: "Kuvempunagar",
      status: "Pending",
      assignedTo: "Sanitation Department",
      description: "Garbage has not been collected for several days."
    },
    {
      id: 2,
      title: "Street light not working",
      location: "Vijayanagar",
      status: "In Progress",
      assignedTo: "Electical Department",
      description: "The street light has not been working properly."
    },
    {
      id: 3,
      title: "Road damage",
      location: "Hebbal",
      status: "Resolved",
      assignedTo: "Road Maintanance Department",
      description: "The road is damaged and needs repair."
    }
  ]);
  const filteredIssues = issues.filter((issue) => {
  const matchesSearch =
    issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.location.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || issue.status === statusFilter;

  return matchesSearch && matchesStatus;
});
  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>

        <nav>
          <ul>
            <li>Dashboard</li>
            <li>All Issues</li>
            <li>Pending Issues</li>
            <li>In Progress</li>
            <li>Resolved Issues</li>
            <li>Users</li>
            <li>Logout</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        <h1>Admin Dashboard</h1>

        <div className="dashboard-content">

          <h2>Welcome, Admin</h2>

          <p>
            Manage and monitor community issues from here.
          </p>
          <div className="search-filter">

  <input
    type="text"
    placeholder="Search issues..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
>
  <option value="All">All Status</option>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Resolved">Resolved</option>
  <option value="Rejected">Rejected</option>
</select>

</div>

          {/* Statistics Cards */}
          <div className="stats-container">

            <div className="stat-card">
              <h3>Total Issues</h3>
              <p>25</p>
            </div>

            <div className="stat-card">
              <h3>Pending</h3>
              <p>8</p>
            </div>

            <div className="stat-card">
              <h3>In Progress</h3>
              <p>7</p>
            </div>

            <div className="stat-card">
              <h3>Resolved</h3>
              <p>10</p>
            </div>

          </div>

          {/* Recent Issues */}
          <div className="recent-issues">

            <h2>Recent Issues</h2>

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
      <td>{issue.title}</td>
      <td>{issue.location}</td>
      <td>
  <span className={`status ${issue.status.toLowerCase().replace(" ", "-")}`}>
    {issue.status}
  </span>
</td>
      <td>
        <button
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
          {selectedIssue && (
  <div className="issue-details">
    <h2>Issue Details</h2>

    <p>
      <strong>Issue:</strong> {selectedIssue.title}
    </p>

    <p>
      <strong>Location:</strong> {selectedIssue.location}
    </p>
    <p>
  <strong>Assigned To:</strong>

  <select
    value={selectedIssue.assignedTo}
    onChange={(e) => {
      const newDepartment = e.target.value;

      setSelectedIssue({
        ...selectedIssue,
        assignedTo: newDepartment
      });

      setIssues(
        issues.map((issue) =>
          issue.id === selectedIssue.id
            ? { ...issue, assignedTo: newDepartment }
            : issue
        )
      );
    }}
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
  <strong>Status:</strong>

  <select
    value={selectedIssue.status}
    onChange={(e) => {
  const newStatus = e.target.value;

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
}}
  >
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Resolved">Resolved</option>
    <option value="Rejected">Rejected</option>
  </select>
</p>

    <p>
      <strong>Description:</strong> {selectedIssue.description}
    </p>

    <button onClick={() => setSelectedIssue(null)}>
      Close
    </button>
  </div>
)}

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;