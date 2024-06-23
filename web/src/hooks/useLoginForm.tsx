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
    let res;
    try {
      // console.log(data);
      res = await axios.post(API_URL + "auth/login", data, {
        withCredentials: true,
      });
      console.log(res.status);
      if (res.status === 200) {
        const responseData = res.data as FormResponse;
        console.log(responseData, res);
        setIsLoggedIn(true);
        setUsername(responseData.data.username);
        navigate("/" + responseData.data.username);
        navigate(0);
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        console.log("setting error");
        setError("root", {
          message:
            error?.response?.data.error ||
            "server down.\n please try again later",
        });
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
