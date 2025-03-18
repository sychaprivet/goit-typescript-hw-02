import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import { ImageProvider } from "./context/imageContext.tsx";

Modal.setAppElement("#root");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ImageProvider>
        <App />
        <Toaster />
      </ImageProvider>
    </BrowserRouter>
  </StrictMode>
);
