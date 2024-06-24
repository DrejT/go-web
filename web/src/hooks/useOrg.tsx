import { useLocation, useParams } from "react-router-dom";

export default function useOrg() {
  const path = useLocation();
  const params = useParams();
  const isOrg = path.pathname.split("/")[1] === "org";
  const orgName = path.pathname.split("/")[2];
  const userType = isOrg ? "org" : "user";
  const loginUrl = isOrg ? "/org/login" : "/login";
  const registerUrl = isOrg ? "/org/register" : "/register";
  const profileUrl = isOrg ? "/org/" + orgName : "/" + params.username;
  return {
    path,
    isOrg,
    orgName,
    loginUrl,
    registerUrl,
    userType,
    profileUrl,
  };
}
