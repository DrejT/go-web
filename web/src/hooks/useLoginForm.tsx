import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormResponse } from "@/lib/types";

interface FormValues {
  username: string;
  password: string;
}

export default function useLoginForm() {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();
  const navigate = useNavigate();
  async function onSubmit(data: FormValues) {
    try {
      console.log(data);
      const res = await axios.post(API_URL + "auth/login", data);
      console.log(res);
      if (res.status === 200) {
        const responseData = res.data as FormResponse;
        console.log(responseData);
        localStorage.setItem("token", responseData.token);
        const user = JSON.stringify(responseData.data);
        localStorage.setItem("user", user);
        navigate("/" + responseData.data.username);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("root", error?.response?.data?.error);
        // console.error(
        //   "Server responded with an error:",
        //   error?.response?.data?.error
        // );
      }
    }
  }
  return {
    onSubmit,
    register,
    errors,
    handleSubmit,
  };
}
