import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useProfile() {
  const params = useParams();
  const [data, setData] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post(
          API_URL + "user/",
          { username: params.username },
          { withCredentials: true }
        );
        console.log(res);
        // setData(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (!data) {
      fetchData();
      setData(!data);
    }
  });
  return { data, params };
}
