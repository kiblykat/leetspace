import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QuestionProvider } from "./contexts/QuestionContext.jsx";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <QuestionProvider>
        <App />
        <Toaster />
      </QuestionProvider>
    </UserProvider>
  </StrictMode>
);
