import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormResponse } from "@/lib/types";
import { useAuth } from "./useAuth";

interface FormValues {
  username: string;
  password: string;
  usertype: "org" | "user";
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
      const res = await axios.post(API_URL + "auth/login", data, {
        withCredentials: true,
      });
      const responseData = res.data as FormResponse;
      if (responseData.data.UserType === "org" && res.status === 200) {
        setIsLoggedIn(true);
        setUsername(responseData.data.Username);
        navigate("/org/" + responseData.data.Username);
      } else if (responseData.data.UserType === "user" && res.status === 200) {
        setIsLoggedIn(true);
        setUsername(responseData.data.Username);
        navigate("/" + responseData.data.Username);
      }
      navigate(0);
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
    onSubmit,
    register,
    errors,
    handleSubmit,
  };
}
