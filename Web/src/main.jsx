import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LogInd } from "./pages/LogInd.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <App />
      <LogInd />
    </StrictMode>
  </BrowserRouter>,
);
