import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

export function useAuth() {
  const [username, setUsername] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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
          setUsername(res?.data?.username);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [isLoggedIn]);
  console.log(isLoggedIn, username);
  return { username, isLoggedIn, setIsLoggedIn, setUsername };
}
