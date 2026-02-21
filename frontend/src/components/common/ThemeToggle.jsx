import { useTheme } from "../../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button type="button" className="icon-button" onClick={toggle}>
      {theme === "light" ? "Dark" : "Light"} mode
    </button>
  );
}
