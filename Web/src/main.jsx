import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LogInd } from "./pages/LogInd.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LogInd />
  </StrictMode>,
);
