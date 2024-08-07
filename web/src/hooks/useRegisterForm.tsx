import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormValues {
  username: string;
  email: string;
  password: string;
  usertype: "user" | "org";
}

export default function useRegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  async function onSubmit(data: FormValues) {
    try {
      console.log(data);
      const res = await axios.post(API_URL + "auth/register", data, {
        withCredentials: true,
      });
      if (res.status === 200) {
        navigate(data.usertype === "user" ? "/login" : "/org/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("root", {
          message:
            error?.response?.data.error ||
            "server down.\n please try again later",
        });
      }
    }
  }
  return { register, errors, handleSubmit, onSubmit };
}
