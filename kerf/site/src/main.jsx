import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TREE } from "./content.js";
const page = TREE;
createRoot(document.getElementById("root")).render(<App page={page} />);
