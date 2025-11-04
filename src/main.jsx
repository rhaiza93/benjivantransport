import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style.css";

function getLang() {
  const usp = new URLSearchParams(window.location.search);
  const lang = usp.get("lang");
  if (lang === "en" || lang === "fr") return lang;
  return "fr"; // default
}

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <App lang={getLang()} />
  </React.StrictMode>
);
