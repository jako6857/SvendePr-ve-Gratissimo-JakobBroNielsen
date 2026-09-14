import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LogInd } from "./pages/LogInd.jsx";
import { browserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <browserRouter>
    <StrictMode>
      <LogInd />
    </StrictMode>
  </browserRouter>,
);
