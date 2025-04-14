import { useState } from "react";
import "./LoginPage.css";
import AlertComponent from "../../../components/UserPages/alerts/AlertComponent";
import axiosClient from "../../../../axiosConfig";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [error, setError] = useState("");

  function userLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Fill all fields");
      showAlertInvalid();
    } else {
      const user = { email, password };
      axiosClient
        .post("/user/login", user, { withCredentials: true })
        .then((result) => {
          if (result.status === 200) {
            history.back();
          }
        })
        .catch(() => {
          setError("Invalid credentials");
          showAlertInvalid();
        });
    }
  }

  function userSignup(e: React.FormEvent) {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Fill all fields");
      showAlertInvalid();
    } else {
      const user = { email, password };
      axiosClient
        .post("/user/register-user", user, { withCredentials: true })
        .then((result) => {
          if (result.status === 200) {
            userLogin(e);
          }
        })
        .catch(() => {
          setError("Invalid Credentials");
          showAlertInvalid();
        });
    }
  }

  function showAlertInvalid() {
    setIsInvalid(true);
    setTimeout(() => setIsInvalid(false), 2000);
  }

  return (
    <div className="split-container">
      <div className="photo-section">
        {/* Photo is handled via CSS background */}
      </div>
      <div className="form-section">
        <div className="form-container">
          {isInvalid && <AlertComponent msg={error} />}
          <h2 className="form-title">Welcome to FashionHub</h2>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <div className="d-flex gap-4 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={userLogin}
            >
              Login
            </button>
            <button
              type="submit"
              className="btn btn-dark"
              onClick={userSignup}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;