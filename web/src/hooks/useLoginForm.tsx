import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormResponse } from "@/lib/types";
import { useAuth } from "./useAuth";

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
  const { setIsLoggedIn, setUsername } = useAuth();
  async function onSubmit(data: FormValues) {
    try {
      console.log(data);
      const res = await axios.post(API_URL + "auth/login", data, {
        withCredentials: true,
      });
      // console.log(res);
      if (res.status === 200) {
        const responseData = res.data as FormResponse;
        console.log(responseData, res);
        setIsLoggedIn(true);
        setUsername(responseData.data.username);
        navigate("/" + responseData.data.username);
        navigate(0);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("root", error?.response?.data?.error);
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
