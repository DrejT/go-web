import { createContext } from "react";
import { authContextProps, searchDataContextProps } from "./types";

export const searchDataContext = createContext<
  searchDataContextProps | undefined
>(undefined);

export const AuthContext = createContext<authContextProps | undefined>(
  undefined
);
