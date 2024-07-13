import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import useOrg from "./useOrg";
import { ProfileData } from "@/lib/types";

export default function useProfile() {
  const [data, setData] = useState<ProfileData | {}>({});
  const [error, setError] = useState<string>("");
  const { isOrg, orgName, username } = useOrg();

  useEffect(() => {
    async function fetchData() {
      try {
        let res;
        if (isOrg && orgName) {
          res = await axios.post(
            API_URL + "org/",
            { orgName },
            { withCredentials: true }
          );
        } else {
          res = await axios.post(
            API_URL + "user/",
            { username },
            { withCredentials: true }
          );
        }
        const { data } = res.data;
        setData(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.error);
        }
        console.log(error);
      }
    }
    fetchData();
  }, [setData, username, orgName, isOrg]);

  return { data, error, isOrg };
}
