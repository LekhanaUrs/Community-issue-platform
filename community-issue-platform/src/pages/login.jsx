import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";


function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("communityUser");

    if (!savedUser) {
      alert("No account found. Please register first.");
      setIsLogin(false);
      return;
    }

    const user = JSON.parse(savedUser);

    if (
      loginData.email === user.email &&
      loginData.password === user.password
    ) {
      alert("Login successful!");

      // Go to Report Issue page
      navigate("/report-issue");
    } else {
      alert("Invalid email or password.");
    }
  };

  // REGISTRATION
  const handleRegister = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "communityUser",
      JSON.stringify(registerData)
    );

    alert("Registration successful! Please login.");

    setRegisterData({
      name: "",
      email: "",
      phone: "",
      password: ""
    });

    setIsLogin(true);
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header>
        <h1>Community Connect</h1>
        <p>Report. Track. Resolve.</p>
      </header>

      {/* LOGIN / REGISTER */}
      <div className="auth-container">

        <div className="auth-box">

          {/* TABS */}
          <div className="tabs">

            <button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>

            <button
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>

          </div>

          {/* LOGIN FORM */}
          {isLogin ? (

            <form onSubmit={handleLogin}>

              <h2>Welcome Back</h2>

              <p className="description">
                Login to Community Connect
              </p>

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value
                  })
                }
                required
              />

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value
                  })
                }
                required
              />

              <button
                type="submit"
                className="submit-btn"
              >
                Login
              </button>

              <p className="switch">
                Don't have an account?{" "}

                <span
                  onClick={() => setIsLogin(false)}
                >
                  Register
                </span>

              </p>

            </form>

          ) : (

            /* REGISTRATION FORM */

            <form onSubmit={handleRegister}>

              <h2>Create Account</h2>

              <p className="description">
                Join Community Connect
              </p>

              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    name: e.target.value
                  })
                }
                required
              />

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    email: e.target.value
                  })
                }
                required
              />

              <label>Phone Number</label>

              <input
                type="tel"
                placeholder="Enter your phone number"
                value={registerData.phone}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    phone: e.target.value
                  })
                }
                required
              />

              <label>Password</label>

              <input
                type="password"
                placeholder="Create password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password: e.target.value
                  })
                }
                required
              />

              <button
                type="submit"
                className="submit-btn"
              >
                Register
              </button>

              <p className="switch">
                Already have an account?{" "}

                <span
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </span>

              </p>

            </form>

          )}

        </div>

      </div>

    </div>
  );
}

export default Login;