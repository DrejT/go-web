import { JobProps } from "@/lib/types";
import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "./useAuth";

export default function useAddJob() {
  const [data, setData] = useState<object>();
  const { username } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<JobProps>();
  async function onSubmit(data: JobProps) {
    try {
      console.log(data);
      const res = await axios.post(
        API_URL + "org/job/new",
        { username, ...data },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setData(res.data?.data);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setError("root", {
          message:
            error.response?.data.error ||
            "server down.\n please try again later",
        });
      }
    }
  }
  return { register, handleSubmit, errors, data, onSubmit };
}
