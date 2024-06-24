import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useOrg from "./useOrg";

export default function useProfile() {
  const params = useParams();
  const [data, setData] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { isOrg, orgName } = useOrg();

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
            { username: params.username },
            { withCredentials: true }
          );
        }
        setData(res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.error);
        }
        console.log(error);
      }
    }
    fetchData();
  }, [setData, params.username, orgName]);
  console.log(isOrg, orgName, data);

  return { data, params, error };
}
