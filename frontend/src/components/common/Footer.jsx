export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <strong>your_Advisor</strong>
              <p style={{ margin: "6px 0 0" }}>
                Build skills with clarity, confidence, and a roadmap that fits your life.
              </p>
            </div>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <span>Privacy</span>
              <span>Terms</span>
              <span>Support</span>
            </div>
          </div>
          <p style={{ margin: "14px 0 0" }}>© 2026 your_Advisor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
