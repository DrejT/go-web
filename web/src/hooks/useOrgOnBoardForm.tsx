import { useForm } from "react-hook-form";

interface FormValues {
  organisationName: string;
  address: string;
  pincode: number;
  employeeCount: number;
  websiteUrl: string;
}

export default function useOrgOnBoardForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();
  async function onSubmit(data: FormValues) {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
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
