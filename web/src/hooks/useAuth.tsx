import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<string>(localStorage.getItem("user") || "");
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  return { user, token, setToken, setUser };
}
