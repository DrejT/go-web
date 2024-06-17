import { useForm } from "react-hook-form";

interface FormValues {
  universityName: string;
  collegeName: string;
  education: string;
  githubUrl: string;
  websiteUrl: string;
}

export default function useUserOnBoardForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  async function onSubmit(data: FormValues) {
    try {
      // todo create a post request and create an api endpoint
      // to store the formdata and update on_board to true
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
