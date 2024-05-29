import React from "react";
import ReactDOM from "react-dom/client";
import ReactQueryProvider from "./components/ReactQueryProvider.tsx";
import { Toaster } from "@/components/ui/sonner";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <App />
      <Toaster />
    </ReactQueryProvider>
  </React.StrictMode>
);
