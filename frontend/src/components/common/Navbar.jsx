import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

const links = [
  { label: "Questionnaire", to: "/questionnaire" },
  { label: "Roadmap", to: "/roadmap" },
  { label: "Dashboard", to: "/dashboard" },
];

export default function Navbar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">YA</span>
          <span>your_Advisor</span>
        </NavLink>
        <nav className="nav-links">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <NavLink to="/login" className="button outline">
            Login
          </NavLink>
          <NavLink to="/signup" className="button accent">
            Get Started
          </NavLink>
        </div>
      </div>
    </header>
  );
}
