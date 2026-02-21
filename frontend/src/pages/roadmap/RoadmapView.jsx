import { useState } from "react";

const sampleRoadmap = [
  {
    id: "week1",
    title: "Foundations",
    duration: "Week 1",
    tasks: ["Intro to HTML & CSS", "Build a landing page", "Watch 2 short videos"],
    resources: ["YouTube: HTML Crash Course", "freeCodeCamp: Responsive Web Design"],
  },
  {
    id: "week2",
    title: "JavaScript Basics",
    duration: "Week 2",
    tasks: ["Variables & functions", "DOM practice", "Mini project"],
    resources: ["MDN JavaScript Guide", "JavaScript30"],
  },
  {
    id: "week3",
    title: "React Essentials",
    duration: "Week 3",
    tasks: ["Components & props", "State & hooks", "Build a small app"],
    resources: ["React Docs", "Scrimba React Course"],
  },
];

export default function RoadmapView() {
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState({});

  const toggleTask = (id) => {
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container">
      <section className="card" style={{ marginBottom: "24px" }}>
        <span className="badge">Your learning journey</span>
        <h2>Your Roadmap</h2>
        <p>Follow the timeline, check off tasks, and keep your notes in one place.</p>
      </section>

      <section className="grid">
        <div className="card">
          <h3>Timeline</h3>
          <div className="timeline">
            {sampleRoadmap.map((step) => (
              <div className="timeline-item" key={step.id}>
                <span className="timeline-dot" />
                <div>
                  <strong>
                    {step.duration}: {step.title}
                  </strong>
                  <div style={{ marginTop: "8px", display: "grid", gap: "8px" }}>
                    {step.tasks.map((task) => {
                      const taskId = `${step.id}-${task}`;
                      return (
                        <label
                          key={taskId}
                          style={{ display: "flex", gap: "10px", alignItems: "center" }}
                        >
                          <input
                            type="checkbox"
                            checked={!!done[taskId]}
                            onChange={() => toggleTask(taskId)}
                          />
                          <span>{task}</span>
                        </label>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <div className="pill-list">
                      {step.resources.map((resource) => (
                        <span key={resource} className="pill">
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Roadmap Notes</h3>
          <p>Write down insights, blockers, or links you want to revisit later.</p>
          <label className="input">
            Notes
            <textarea
              rows="8"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Example: Week 2 felt tough. Spend extra time on DOM practice."
            />
          </label>
          <button className="button accent" type="button">
            Save Notes
          </button>
        </div>
      </section>
    </div>
  );
}
