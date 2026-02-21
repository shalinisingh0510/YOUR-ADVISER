import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container">
      <section className="card" style={{ textAlign: "center", padding: "40px" }}>
        <h2>Page not found</h2>
        <p>Let’s get you back to your roadmap.</p>
        <NavLink to="/" className="button accent">
          Go Home
        </NavLink>
      </section>
    </div>
  );
}
