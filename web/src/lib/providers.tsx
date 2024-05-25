// import { useContext, useState, useEffect } from "react";
import { layoutProps } from "./types";
import { AuthContext } from "./context";
import { useAuth } from "@/hooks/useAuth";

export function AuthProvider({ children }: layoutProps) {
  return (
    <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
  );
}
