import { useEffect, useState } from "react";
import "../App.css";

function ViewIssues() {

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const savedIssues =
      JSON.parse(localStorage.getItem("communityIssues")) || [];

    setIssues(savedIssues);
  }, []);

  return (
    <div className="issues-page">

      <header>
        <h1>Community Connect</h1>
        <p>View Reported Issues</p>
      </header>

      <div className="issues-container">

        <h2>Reported Issues</h2>

        {issues.length === 0 ? (

          <div className="no-issues">
            <p>No issues have been reported yet.</p>
          </div>

        ) : (

          <div className="issues-list">

            {issues.map((issue) => (

              <div className="issue-card" key={issue.id}>

                <div className="issue-header">

                  <h3>{issue.title}</h3>

                  <span
                    className={`status ${issue.status.toLowerCase()}`}
                  >
                    {issue.status}
                  </span>

                </div>

                <p>
                  <strong>Category:</strong>{" "}
                  {issue.category}
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {issue.description}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {issue.location}
                </p>

                <p>
                  <strong>Priority:</strong>{" "}
                  {issue.priority}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {issue.date}
                </p>

                <p>
                  <strong>Issue ID:</strong>{" "}
                  {issue.id}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default ViewIssues;