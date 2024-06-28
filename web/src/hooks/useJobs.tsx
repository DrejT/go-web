import { JobProps } from "@/lib/types";
import { API_URL } from "@/lib/utils";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import useOrg from "./useOrg";

export default function useJobs() {
  const [jobsList, setJobsList] = useState<Array<JobProps>>([]);
  const [error, setError] = useState<string>("");
  const { orgName } = useOrg();
  useEffect(() => {
    let res: AxiosResponse;
    try {
      (async function () {
        res = await axios.post(
          API_URL + "org/job",
          { orgName },
          { withCredentials: true }
        );
        if (res.status === 200) {
          setError(res.data?.error);
          setJobsList(res.data?.data);
        }
      })();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        setError(
          error?.response?.data?.error ||
            "server down.\n please try again later"
        );
      }
    }
  }, [error, orgName]);
  return {
    jobsList,
    error,
  };
}
