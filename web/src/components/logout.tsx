import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      try {
        const res = await axios.delete(API_URL + "auth/logout", {
          withCredentials: true,
        });
        console.log(res);
        if (res.status === 200) {
          navigate("/");
          navigate(0);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  });
  return <></>;
}
