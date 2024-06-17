import { API_URL } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useAuth } from "./useAuth";
import axios from "axios";

interface FormValues {
  universityName: string;
  collegeName: string;
  education: string;
  githubUrl: string;
  websiteUrl: string;
}

export default function useUserOnBoardForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();
  const { username } = useAuth();
  async function onSubmit(data: FormValues) {
    try {
      console.log(data);
      const res = await axios.post(API_URL + "user/onboard", {
        username,
        ...data,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        setError("root", {
          message:
            error?.response?.data.error ||
            "server down.\n please try again later",
        });
      }
    }
  }
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
