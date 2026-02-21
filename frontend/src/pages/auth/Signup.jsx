import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signup } from "../../services/auth.service.js";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    goal: "Software Development",
  });
  const [status, setStatus] = useState({ loading: false, error: "" });

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });
    try {
      await signup(form);
      navigate("/questionnaire");
    } catch (error) {
      setStatus({
        loading: false,
        error: error?.response?.data?.message || "Signup failed. Try again.",
      });
    }
  };

  return (
    <div className="container">
      <section className="grid">
        <div className="card">
          <span className="badge">Create your profile</span>
          <h2>Create your learning profile</h2>
          <p>
            Tell us a little about yourself and we will build the roadmap around your goals.
          </p>
          <div className="card" style={{ marginTop: "16px" }}>
            <h3>What you will unlock</h3>
            <p>Personalized roadmap, curated resources, and a clear weekly plan.</p>
          </div>
        </div>
        <form className="card form-shell" onSubmit={onSubmit}>
          <h3>Sign up</h3>
          <div className="form-grid">
            <label className="input">
              Full name
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={onChange}
                required
              />
            </label>
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
                placeholder="Create a strong password"
                value={form.password}
                onChange={onChange}
                required
              />
            </label>
            <label className="input">
              Goal
              <select name="goal" value={form.goal} onChange={onChange}>
                <option>Software Development</option>
                <option>Data Science</option>
                <option>UX Design</option>
                <option>Product Management</option>
                <option>Digital Marketing</option>
              </select>
            </label>
          </div>
          {status.error ? (
            <p style={{ color: "#c1415c", margin: 0 }}>{status.error}</p>
          ) : null}
          <button className="button accent" type="submit" disabled={status.loading}>
            {status.loading ? "Creating account..." : "Create account"}
          </button>
          <p style={{ margin: 0 }}>
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </form>
      </section>
    </div>
  );
}
