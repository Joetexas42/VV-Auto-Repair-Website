import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { validateLocationUrls } from "./lib/locations";

if (import.meta.env.DEV) {
  validateLocationUrls();
}

createRoot(document.getElementById("root")!).render(<App />);
