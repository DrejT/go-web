import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import useOrg from "./useOrg";

interface FormValues {
  orgName: string;
  address: string;
  pincode: string;
  employeeCount: string;
  websiteUrl: string;
}

export default function useOrgOnBoardForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();
  const { username } = useAuth();
  const navigate = useNavigate();
  async function onSubmit(data: FormValues) {
    try {
      console.log(data);
      const res = await axios.post(
        API_URL + "org/onboard",
        {
          username,
          ...data,
          employeeCount: parseInt(data.employeeCount, 10),
          pincode: parseInt(data.pincode, 10),
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        // console.log(profileUrl);
        navigate(0);
      }
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
    setError,
    onSubmit,
  };
}
