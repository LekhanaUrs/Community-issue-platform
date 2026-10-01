import { useState } from "react";
import { Link }from "react-router-dom";
function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleRegister = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "communityUser",
      JSON.stringify(formData)
    );

    alert("Registration successful!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      password: ""
    });
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>Community Connect</h1>

        <h2>Create Account</h2>

        <p>Register to report community issues</p>

        <form onSubmit={handleRegister}>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
            }
            required
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
            required
          />

          <label>Phone Number</label>

          <input
            type="tel"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value
              })
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value
              })
            }
            required
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p className="auth-link">
          Already have an account?
          <Link to="/login">Loginr</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;