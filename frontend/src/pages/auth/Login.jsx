import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service.js";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "" });

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });
    try {
      await login(form);
      navigate("/dashboard");
    } catch (error) {
      setStatus({
        loading: false,
        error: error?.response?.data?.message || "Login failed. Try again.",
      });
    }
  };

  return (
    <div className="container">
      <section className="grid">
        <div className="card">
          <span className="badge">LMS portal access</span>
          <h2>Welcome back</h2>
          <p>Continue your learning journey in a few clicks.</p>
          <div className="pill-list" style={{ marginTop: "16px" }}>
            <span className="pill">Saved roadmaps</span>
            <span className="pill">Progress tracking</span>
            <span className="pill">Weekly nudges</span>
          </div>
        </div>
        <form className="card form-shell" onSubmit={onSubmit}>
          <h3>Login</h3>
          <div className="form-grid">
            <label className="input">
              Email
              <input
                type="email"
                name="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={onChange}
                required
              />
            </label>
            <label className="input">
              Password
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={onChange}
                required
              />
            </label>
          </div>
          {status.error ? (
            <p style={{ color: "#c1415c", margin: 0 }}>{status.error}</p>
          ) : null}
          <button className="button accent" type="submit" disabled={status.loading}>
            {status.loading ? "Signing in..." : "Login"}
          </button>
          <p style={{ margin: 0 }}>
            New here? <NavLink to="/signup">Create an account</NavLink>
          </p>
        </form>
      </section>
    </div>
  );
}
