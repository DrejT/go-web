import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useHeroForm() {
  const [role, setRole] = useState<String>("");
  const navigate = useNavigate();
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // const form = new FormData(e.currentTarget);
    // console.log(form.get("role"));
    navigate("/search?role=" + role);
    try {
    } catch (error) {
      console.log(error);
    }
  }
  return { role, setRole, handleSubmit };
}
