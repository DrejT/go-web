import { JobProps } from "@/lib/types";
import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import useOrg from "./useOrg";

export default function useJobs() {
  const [jobsList, setJobsList] = useState<Array<JobProps>>([]);
  const { orgName } = useOrg();
  useEffect(() => {
    try {
      (async function () {
        const res = await axios.post(
          API_URL + "org/jobs",
          { orgName },
          { withCredentials: true }
        );
        if (res.status === 200) {
          setJobsList(res.data?.data);
        }
      })();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
      }
    }
  });
  return {
    jobsList,
  };
}
