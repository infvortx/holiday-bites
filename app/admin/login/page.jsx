"use client";

import LoginScreen from "./components/LoginScreen";
import { getToken } from "../../firebase";

export default function AdminLogin() {
  getToken().then((token) => {
    if (token) {
      window.location.href = "/admin";
    }
  });

  return <LoginScreen />;
}