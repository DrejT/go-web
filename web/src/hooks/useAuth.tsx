import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

export function useAuth() {
  const [username, setUsername] = useState<string>("");
  const [onboard, setOnboard] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>("user");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const profileUrl = userType === "org" ? "/org/" + username : "/" + username;
  useEffect(() => {
    try {
      (async function () {
        const res = await axios
          .get(API_URL + "auth/session", {
            withCredentials: true,
          })
          .catch((error) => console.error(error));
        if (res?.status === 200) {
          setIsLoggedIn(true);
          setUsername(res.data.user.Username);
          setOnboard(res.data.user.OnBoard);
          setUserType(res.data.user.UserType);
        }
      })();
    } catch (error) {
      console.error(error);
    }
  }, [isLoggedIn, username, onboard]);
  return {
    username,
    isLoggedIn,
    setIsLoggedIn,
    setUsername,
    onboard,
    userType,
    profileUrl,
  };
}
