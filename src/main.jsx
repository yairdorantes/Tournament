import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PDFProvider } from "./context/PDFContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PDFProvider>
          <App />
        </PDFProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
