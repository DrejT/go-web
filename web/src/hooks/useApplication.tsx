import { JobProps } from "@/lib/types";
import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useApplication() {
  const [data, setData] = useState<JobProps[] | []>([]);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(API_URL + "user/applications", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setData(res.data.data);
        }
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.error ||
              "there was an error please try again later"
          );
        }
      }
    })();
  }, []);
  return { data, error };
}
