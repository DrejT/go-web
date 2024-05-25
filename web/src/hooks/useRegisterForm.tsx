import { postData } from "@/lib/fetch";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormValues {
  username: string;
  email: string;
  password: string;
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
      const { username, email, password } = data;
      console.log(data);
      const res = await postData("auth/register", {
        username,
        email,
        password,
      }).then((res) => {
        const code = res.status;
        if (code === 200) {
          navigate("/login");
        }
        return res.json();
      });
      setError("root", res.error);
    } catch (error) {
      console.log(error);
    }
  }
  return { register, errors, handleSubmit, onSubmit };
}
