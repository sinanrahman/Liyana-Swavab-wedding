import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactLenis } from "lenis/react";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <App />
    </ReactLenis>
  </StrictMode>
);
