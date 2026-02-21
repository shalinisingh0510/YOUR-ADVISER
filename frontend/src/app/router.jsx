import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/auth/Login.jsx";
import Signup from "../pages/auth/Signup.jsx";
import Questionnaire from "../pages/questionnaire/Questionnaire.jsx";
import AptitudeTest from "../pages/questionnaire/AptitudeTest.jsx";
import RoadmapView from "../pages/roadmap/RoadmapView.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import NotFound from "../pages/NotFound.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/questionnaire" element={<Questionnaire />} />
      <Route path="/aptitude" element={<AptitudeTest />} />
      <Route path="/roadmap" element={<RoadmapView />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
