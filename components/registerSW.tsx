"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV === "development") {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
          console.log("SW Unregistered for Local Development");
        }
      });
      return;
    }

    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("SW Registered successfully:", reg.scope))
      .catch((err) => console.error("SW Registration failed:", err));
  }, []);

  return null;
}