import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useForm } from "react-hook-form";

interface FormValues {
  githubUrl: string;
}

export function useGithubUrl() {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();
  async function onSubmit(data: FormValues) {
    try {
      const res = await axios.post(
        API_URL + "api/user/github",
        { githubUrl: data },
        { withCredentials: true }
      );
      console.log(res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("root", { message: error?.response?.data.error });
      }
    }
  }
  return {
    register,
    setError,
    errors,
    handleSubmit,
    onSubmit,
  };
}
