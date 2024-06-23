import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useBusinessProfile() {
  const p = useParams();
  const orgname = p.pathname?.split("/")[2];
  const [businessData, setBusinessData] = useState<object>({});
  useEffect(() => {
    try {
      async function getData() {
        const res = await axios.get(API_URL + "org/" + orgname);
        console.log(res);
        if (res.status === 200) {
          setBusinessData(res.data);
        }
      }
      getData();
    } catch (error) {
      console.error(error);
    }
  }, [businessData]);
  return {
    businessData,
    orgname,
  };
}
