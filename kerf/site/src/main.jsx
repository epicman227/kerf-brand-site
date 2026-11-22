import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TREE, LEGAL } from "./content.js";
const k = typeof __KERF_PAGE__ !== "undefined" ? __KERF_PAGE__ : "index";
const pricing = typeof __KERF_PRICING__ !== "undefined" ? __KERF_PRICING__ : null;
createRoot(document.getElementById("root")).render(<App page={TREE} legal={LEGAL[k]} view={k} pricing={pricing} />);
