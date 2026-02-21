import { NavLink } from "react-router-dom";

const highlights = [
  "Curated free resources",
  "Weekly learning rhythm",
  "Clear skill checkpoints",
  "Career aligned milestones",
];

const cards = [
  { title: "Smart Questionnaire", desc: "Understand your learning style in minutes." },
  { title: "AI Roadmap", desc: "Get a step-by-step path with curated resources." },
  { title: "Progress Tracking", desc: "Stay consistent with weekly check-ins." },
  { title: "Study Planner", desc: "Plan sessions without overwhelm." },
];

const stats = [
  { label: "Active learners", value: "12k+" },
  { label: "Roadmaps created", value: "38k+" },
  { label: "Weekly sessions", value: "4.6 avg" },
];

export default function Home() {
  return (
    <div className="container">
      <section className="portal-hero">
        <div>
          <span className="badge">LMS style guidance for students</span>
          <h1>Build a learning portal that feels personal.</h1>
          <p>
            your_Advisor blends a career roadmap, weekly planning, and bite-sized learning
            into one clean portal.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <NavLink to="/signup" className="button accent">
              Start Your Roadmap
            </NavLink>
            <NavLink to="/questionnaire" className="button outline">
              Take the Questionnaire
            </NavLink>
          </div>
          <div className="pill-list" style={{ marginTop: "18px" }}>
            {highlights.map((item) => (
              <span className="pill" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Today’s Learning Plan</h3>
          <p>3 tasks • 45 minutes</p>
          <div className="grid" style={{ marginTop: "16px" }}>
            <div className="stat-card">
              <strong>Reading</strong>
              <span>Design thinking recap</span>
            </div>
            <div className="stat-card">
              <strong>Video</strong>
              <span>React hooks mini lesson</span>
            </div>
            <div className="stat-card">
              <strong>Practice</strong>
              <span>Quiz: CSS grids</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Your personal learning portal</h2>
        <p>Everything you need to learn without feeling lost.</p>
        <div className="grid">
          {cards.map((item) => (
            <div className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Student-friendly impact</h2>
        <p>Stay focused with metrics that actually help.</p>
        <div className="grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <strong style={{ fontSize: "1.6rem" }}>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
