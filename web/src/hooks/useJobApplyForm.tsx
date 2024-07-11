import { API_URL } from "@/lib/utils";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useJobApplyForm(jobId: number) {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.post(
        API_URL + "org/job/apply",
        { jobId },
        { withCredentials: true }
      );
      if (res.status === 200) {
        navigate("/" + res.data.data.username);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error);
      }
    }
  }
  return {
    handleSubmit,
    error,
    jobId,
  };
}
