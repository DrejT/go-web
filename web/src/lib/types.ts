import { Dispatch, SetStateAction } from "react";

export interface layoutProps {
  children: React.ReactNode;
}

export interface authUserProps {
  email: string;
  username: string;
  role: Role;
}

export interface searchDataContextProps {
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
  role: string;
  setRole: Dispatch<SetStateAction<string>>;
  data: object[];
  setData: Dispatch<SetStateAction<object[]>>;
}

export interface authContextProps {
  token: string;
  user: string;
  setUser: Dispatch<SetStateAction<string>> | null;
  setToken: Dispatch<SetStateAction<string>> | null;
}

// login form response
type Role = "admin" | "user" | "business";

interface DataResponse {
  username: string;
  email: string;
  role: Role;
}

export interface FormResponse {
  token: string;
  data: DataResponse;
}
