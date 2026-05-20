import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { reportWebVitals } from "@/lib/reportWebVitals";

// Automatically unregister service workers in development to bypass aggressive PWA caching
if (import.meta.env.DEV && typeof window !== "undefined" && "serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister().then((success) => {
        if (success) {
          console.log("[PWA] Service Worker unregistered in dev mode to prevent caching.");
          window.location.reload();
        }
      });
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);

// Capture Core Web Vitals. Dev: console logs. Prod: wire reportMetric() in
// src/lib/reportWebVitals.ts to your analytics endpoint when ready.
reportWebVitals();
