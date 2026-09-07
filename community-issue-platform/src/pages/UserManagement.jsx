import { useState } from "react";

function UserManagement() {
  const [selectedUser, setSelectedUser] = useState(null);

  const [users] = useState([
    {
      id: 1,
      name: "Rahul",
      email: "rahul@email.com",
      issuesReported: 3,
      status: "Active"
    },
    {
      id: 2,
      name: "Priya",
      email: "priya@email.com",
      issuesReported: 5,
      status: "Active"
    },
    {
      id: 3,
      name: "Arjun",
      email: "arjun@email.com",
      issuesReported: 1,
      status: "Blocked"
    }
  ]);

  return (
    <div className="users-management">
      <h1>Users Management</h1>
      <p>Manage community users here.</p>
      <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Issues Reported</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {users.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.issuesReported}</td>
        <td>
  <span className={`user-status ${user.status.toLowerCase()}`}>
    {user.status}
  </span>
</td>
<td>
  <button onClick={()=> setSelectedUser(user)}>View</button>
</td>
      </tr>
    ))}
  </tbody>
</table>
{selectedUser && (
  <div className="user-details">
    <h2>User Details</h2>

    <p>
      <strong>Name:</strong> {selectedUser.name}
    </p>

    <p>
      <strong>Email:</strong> {selectedUser.email}
    </p>

    <p>
      <strong>Issues Reported:</strong> {selectedUser.issuesReported}
    </p>

    <p>
      <strong>Status:</strong> {selectedUser.status}
    </p>

    <button onClick={() => setSelectedUser(null)}>
      Close
    </button>
  </div>
)}
    </div>
  );
}

export default UserManagement;