import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="878658925094-8djnnvm51jmoc6i2h6l6v2sg4kvuka20.apps.googleusercontent.com">
    <AuthProvider>
      <App />
    </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
