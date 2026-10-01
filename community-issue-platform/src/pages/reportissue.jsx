import { useState } from "react";
import "../App.css";

function ReportIssue() {

  const [issue, setIssue] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    priority: ""
  });

  const handleChange = (e) => {
    setIssue({
      ...issue,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIssue = {
      ...issue,
      id: Date.now(),
      status: "Pending",
      date: new Date().toLocaleDateString()
    };

    // Get existing issues
    const existingIssues =
      JSON.parse(localStorage.getItem("communityIssues")) || [];

    // Add new issue
    existingIssues.push(newIssue);

    // Save issues
    localStorage.setItem(
      "communityIssues",
      JSON.stringify(existingIssues)
    );

    alert("Issue reported successfully!");

    // Clear form
    setIssue({
      title: "",
      category: "",
      description: "",
      location: "",
      priority: ""
    });
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h2>Report an Issue</h2>

        <p className="description">
          Help us make your community better
        </p>

        <form onSubmit={handleSubmit}>

          <label>Issue Title</label>

          <input
            type="text"
            name="title"
            placeholder="Enter issue title"
            value={issue.title}
            onChange={handleChange}
            required
          />

          <label>Category</label>

          <select
            name="category"
            value={issue.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Road">Road</option>
            <option value="Garbage">Garbage</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Street Light">Street Light</option>
            <option value="Drainage">Drainage</option>
            <option value="Electricity">Electricity</option>
            <option value="Other">Other</option>
          </select>

          <label>Description</label>

          <textarea
            name="description"
            placeholder="Describe the issue"
            value={issue.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>

          <label>Location</label>

          <input
            type="text"
            name="location"
            placeholder="Enter issue location"
            value={issue.location}
            onChange={handleChange}
            required
          />

          <label>Priority</label>

          <select
            name="priority"
            value={issue.priority}
            onChange={handleChange}
            required
          >
            <option value="">Select priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button
            type="submit"
            className="submit-btn"
          >
            Submit Issue
          </button>

        </form>

      </div>

    </div>
  );
}

export default ReportIssue;