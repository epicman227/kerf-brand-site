import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TREE, TRADES } from "./content.js";
const page = typeof __KERF_PAGE__ !== "undefined" && __KERF_PAGE__ === "trades" ? TRADES : TREE;
createRoot(document.getElementById("root")).render(<App page={page} />);
