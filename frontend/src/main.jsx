import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QuestionProvider } from "./contexts/QuestionContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuestionProvider>
      <App />
      <Toaster />
    </QuestionProvider>
  </StrictMode>
);
