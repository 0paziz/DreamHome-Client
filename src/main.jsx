import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { PropertyProvider } from "./context/PropertyContext";
import { PrivatePropertyProvider } from "./context/PrivatepropertyContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <PrivatePropertyProvider>
      <PropertyProvider>
      <App />
       </PropertyProvider>
        </PrivatePropertyProvider>
    </AuthProvider>
  </React.StrictMode>
);
