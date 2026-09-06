
import { useState } from "react";

function AdminDashboard() {
    const [selectedIssue, setSelectedIssue] = useState(null);
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

                <tr>
                  <td>Garbage not collected</td>
                  <td>Kuvempunagar</td>
                  <td>Pending</td>
                  <td>
                    <button
  onClick={() =>
    setSelectedIssue({
      title: "Garbage not collected",
      location: "Kuvempunagar",
      status: "Pending",
      description: "Garbage has not been collected for several days."
    })
  }
>
  View
</button>
                  </td>
                </tr>

                <tr>
                  <td>Street light not working</td>
                  <td>Vijayanagar</td>
                  <td>In Progress</td>
                  <td>
                    <button
  onClick={() =>
    setSelectedIssue({
      title: "Street light not working",
      location: "Vijayanagar",
      status: "In Progress",
      description: "The street light has not been working properly."
    })
  }
>
  View
</button>
                  </td>
                </tr>

                <tr>
                  <td>Road damage</td>
                  <td>Hebbal</td>
                  <td>Resolved</td>
                  <td>
                    <button
  onClick={() =>
    setSelectedIssue({
      title: "Road damage",
      location: "Hebbal",
      status: "Resolved",
      description: "The road is damaged and needs repair."
    })
  }
>
  View
</button>
                  </td>
                </tr>

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
  <strong>Status:</strong>

  <select
    value={selectedIssue.status}
    onChange={(e) =>
      setSelectedIssue({
        ...selectedIssue,
        status: e.target.value
      })
    }
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