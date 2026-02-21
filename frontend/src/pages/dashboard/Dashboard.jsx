const overview = [
  { label: "Courses in progress", value: "3" },
  { label: "Hours this week", value: "5h 40m" },
  { label: "Streak", value: "8 days" },
];

const milestones = [
  { label: "Week 1", status: "complete", note: "Foundations done" },
  { label: "Week 2", status: "active", note: "React hooks in progress" },
  { label: "Week 3", status: "upcoming", note: "API integration" },
  { label: "Week 4", status: "upcoming", note: "Portfolio project" },
];

const lessons = [
  { title: "React State Patterns", time: "20 min", tag: "Core" },
  { title: "CSS Layout Lab", time: "15 min", tag: "Practice" },
  { title: "Career Prep Notes", time: "10 min", tag: "Reflection" },
];

const versions = [
  { id: "v3", label: "Roadmap v3", date: "Jan 20, 2026" },
  { id: "v2", label: "Roadmap v2", date: "Jan 05, 2026" },
  { id: "v1", label: "Roadmap v1", date: "Dec 12, 2025" },
];

export default function Dashboard() {
  return (
    <div className="container">
      <section className="grid">
        <div className="card">
          <span className="badge">Learning dashboard</span>
          <h2>Welcome back, Aisha</h2>
          <p>Your current goal: Full-Stack Web Development</p>
          <div className="grid" style={{ marginTop: "18px" }}>
            {overview.map((item) => (
              <div className="stat-card" key={item.label}>
                <strong style={{ fontSize: "1.4rem" }}>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "18px" }}>
            <div className="progress">
              <span />
            </div>
            <p style={{ margin: "10px 0 0" }}>55% complete • 2 weeks ahead of schedule</p>
          </div>
          <div style={{ marginTop: "18px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button className="button accent" type="button">
              Regenerate Roadmap
            </button>
            <button className="button outline" type="button">
              View Roadmap
            </button>
          </div>
        </div>

        <div className="card">
          <h3>Today’s lessons</h3>
          <div className="timeline">
            {lessons.map((lesson) => (
              <div key={lesson.title} className="timeline-item">
                <span className="timeline-dot" />
                <div>
                  <strong>{lesson.title}</strong>
                  <p style={{ margin: "4px 0 0", color: "var(--ink-500)" }}>
                    {lesson.time} • {lesson.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Active roadmap</h2>
        <p>Your weekly milestones and progress checkpoints.</p>
        <div className="grid">
          {milestones.map((item) => (
            <div className="card" key={item.label}>
              <h3>{item.label}</h3>
              <p>{item.note}</p>
              <span className="badge" style={{ marginTop: "12px", display: "inline-flex" }}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Roadmap history</h2>
        <p>Compare versions and track how your goals evolved.</p>
        <div className="grid">
          {versions.map((version) => (
            <div className="card" key={version.id}>
              <h3>{version.label}</h3>
              <p>Generated on {version.date}</p>
              <button className="button outline" type="button">
                Open Version
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
