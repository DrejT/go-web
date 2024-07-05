import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface jobResponse {
  Description: string;
  Experience: string;
  Flexibility: string;
  ID: number;
  JobType: string;
  Language: string;
  Location: string;
  OrgName: string;
  Title: string;
}

export default function useJobData() {
  const [jobData, setJobData] = useState<jobResponse | undefined>(undefined);
  const [error, setError] = useState<string>("");
  const [fetchStatus, setFetchStatus] = useState<boolean>(true);
  const { orgname, jobid } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          API_URL + "org/?" + "orgName=" + orgname + "&jobId=" + jobid
        );
        if (res.status === 200) {
          setJobData(res.data.data);
        }
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.error ||
              "there was an error please try again later"
          );
        }
      }
    }
    if (fetchStatus) {
      fetchData();
      setFetchStatus(!fetchStatus);
    }
  }, [fetchStatus, orgname, jobid]);
  return {
    jobData,
    error,
  };
}
