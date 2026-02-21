import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../services/api.js";

const fallbackQuestions = [
  {
    id: "learn_style",
    type: "mcq",
    prompt: "How do you prefer to learn?",
    options: ["Videos", "Articles", "Hands-on projects", "Mix of all"],
  },
  {
    id: "time_commitment",
    type: "scale",
    prompt: "How many hours can you study per week?",
    options: ["2-4", "5-7", "8-10", "10+"],
  },
  {
    id: "topics",
    type: "multi",
    prompt: "Which topics excite you most?",
    options: ["Web apps", "Mobile apps", "AI/ML", "Design systems", "Data analytics"],
  },
];

export default function Questionnaire() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    let mounted = true;
    api
      .get("/api/questionnaire")
      .then((response) => {
        if (mounted) {
          setQuestions(response.data?.questions || fallbackQuestions);
          setStatus({ loading: false, error: "" });
        }
      })
      .catch(() => {
        if (mounted) {
          setQuestions(fallbackQuestions);
          setStatus({ loading: false, error: "" });
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const updateAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const toggleMulti = (id, value) => {
    const list = answers[id] || [];
    if (list.includes(value)) {
      updateAnswer(
        id,
        list.filter((item) => item !== value)
      );
    } else {
      updateAnswer(id, [...list, value]);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/api/questionnaire/submit", { answers });
      navigate("/aptitude");
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
        <span className="badge">Step 1 of 2</span>
        <h2>Smart Questionnaire</h2>
        <p>Answer a few quick questions so we can tailor your learning roadmap.</p>
      </section>

      <form className="card form-shell" onSubmit={onSubmit}>
        {status.loading ? <p>Loading questions...</p> : null}
        {questions.map((question) => (
          <div key={question.id} className="card">
            <h3>{question.prompt}</h3>
            {question.type === "mcq" || question.type === "scale" ? (
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
            ) : null}
            {question.type === "multi" ? (
              <div className="pill-list">
                {question.options.map((option) => (
                  <button
                    className="pill"
                    key={option}
                    type="button"
                    onClick={() => toggleMulti(question.id, option)}
                    style={{
                      background: (answers[question.id] || []).includes(option)
                        ? "#ffe8ef"
                        : "var(--sky-200)",
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        {status.error ? (
          <p style={{ color: "#c1415c", margin: 0 }}>{status.error}</p>
        ) : null}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button className="button accent" type="submit">
            Submit & Continue
          </button>
          <NavLink to="/aptitude" className="button outline">
            Skip for now
          </NavLink>
        </div>
      </form>
    </div>
  );
}
