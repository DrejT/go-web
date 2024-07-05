import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useJobData() {
  const [jobData, setJobData] = useState<object>({});
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
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (fetchStatus) {
      fetchData();
      setFetchStatus(!fetchStatus);
    }
  }, [orgname, jobid, jobData]);
  return {
    jobData,
  };
}
