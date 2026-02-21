import AppRouter from "./router.jsx";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}
