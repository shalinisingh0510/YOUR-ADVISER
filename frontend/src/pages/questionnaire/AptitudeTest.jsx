import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";

const sampleQuestions = [
  {
    id: "logic_1",
    prompt: "Which pattern comes next in the sequence: 2, 4, 8, 16, ?",
    options: ["18", "24", "32", "40"],
  },
  {
    id: "focus_1",
    prompt: "You have 1 hour today. What do you prioritize?",
    options: ["Watch a tutorial", "Practice coding", "Review notes", "Plan the week"],
  },
];

export default function AptitudeTest() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState({ loading: false, error: "" });

  const updateAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });
    try {
      await api.post("/api/questionnaire/aptitude", { answers });
      navigate("/roadmap");
    } catch (error) {
      setStatus({
        loading: false,
        error: error?.response?.data?.message || "Submission failed. Try again.",
      });
    }
  };

  return (
    <div className="container">
      <section className="card" style={{ marginBottom: "24px" }}>
        <span className="badge">Step 2 of 2</span>
        <h2>Aptitude Check</h2>
        <p>Short and friendly. This helps us fine-tune your roadmap pacing.</p>
      </section>
      <form className="card form-shell" onSubmit={onSubmit}>
        {sampleQuestions.map((question) => (
          <div className="card" key={question.id}>
            <h3>{question.prompt}</h3>
            <div className="pill-list">
              {question.options.map((option) => (
                <button
                  className="pill"
                  key={option}
                  type="button"
                  onClick={() => updateAnswer(question.id, option)}
                  style={{
                    background:
                      answers[question.id] === option ? "#d9fff6" : "var(--sky-200)",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
        {status.error ? (
          <p style={{ color: "#c1415c", margin: 0 }}>{status.error}</p>
        ) : null}
        <button className="button accent" type="submit" disabled={status.loading}>
          {status.loading ? "Saving..." : "Generate Roadmap"}
        </button>
      </form>
    </div>
  );
}
