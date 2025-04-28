"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { logoutUser } from "@/store/userSlice";

const LogoutButton = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // Envia os cookies
      });

      if (res.ok) {
        dispatch(logoutUser());
      } else {
        alert("Erro ao fazer logout");
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <button onClick={handleLogout}>Sair</button>
  );
};

export default LogoutButton;
