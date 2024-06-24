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
  isLoggedIn: boolean;
  username: string;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUsername: Dispatch<SetStateAction<string>>;
}

// login form response
type Role = "admin" | "user" | "business";

interface DataResponse {
  Email: string;
  OnBoard: boolean;
  PassHash: string;
  UserType: string;
  Username: string;
}

export interface FormResponse {
  username: string;
  data: DataResponse;
}

export interface ProfileData {
  Email: string;
  ID: number;
  OnBoard: boolean;
  UserType: "org" | "user";
  Username: string;
}
