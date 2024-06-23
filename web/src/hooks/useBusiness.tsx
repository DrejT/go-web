import { useLocation } from "react-router-dom";

export default function useBusiness() {
  const p = useLocation();
  const isBusiness = p.pathname.split("/")[1] === "business";
  const userType = isBusiness ? "org" : "user";
  const loginUrl = isBusiness ? "/business/login" : "/login";
  const registerUrl = isBusiness ? "/business/register" : "/register";
  return {
    isBusiness,
    loginUrl,
    registerUrl,
    userType,
  };
}
