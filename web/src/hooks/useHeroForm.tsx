import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormValues {
  searchTerm: string;
}

export function useHeroForm() {
  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
  } = useForm<FormValues>();
  const navigate = useNavigate();
  async function onSubmit(data: FormValues) {
    try {
      navigate("/search?role=" + data.searchTerm);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return { handleSubmit, errors, setError, register, onSubmit };
}
