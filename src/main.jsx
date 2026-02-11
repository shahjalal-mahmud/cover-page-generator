import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/modern-animations.css";
import App from "./App.jsx";

// Force dark mode permanently
document.documentElement.classList.add("dark");
document.documentElement.setAttribute("data-theme", "dark");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
