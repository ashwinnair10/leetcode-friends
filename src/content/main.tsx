import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

function injectApp() {

  if (
    document.getElementById(
      "leetfriends-root"
    )
  ) {
    return;
  }

  const container =
    document.createElement("div");

  container.id =
    "leetfriends-root";

  document.body.appendChild(
    container
  );

  ReactDOM.createRoot(
    container
  ).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

injectApp();