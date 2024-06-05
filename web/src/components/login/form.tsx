import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useLoginForm from "@/hooks/useLoginForm";
import InputError from "../ui/inputError";

export function LoginForm() {
  const { handleSubmit, onSubmit, register, errors } = useLoginForm();
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <div className="flex justify-center">
          <h3 className="md:text-2xl font-semibold">login</h3>
        </div>
        <div className="mb-1">
          <div className="mb-3">
            <Label htmlFor="username">username</Label>
            <Input
              {...register("username", {
                required: "username is required",
              })}
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              placeholder="vivek patel"
            />
            <InputError message={errors.username?.message} />
          </div>

          <div className="mb-3">
            <Label htmlFor="password">password</Label>
            <Input
              {...register("password", {
                required: "password is required",
              })}
              type="password"
              id="password"
              name="password"
            />
            <InputError message={errors.password?.message} />
          </div>
          <div>
            <p className="text-sm">
              <Link to={"/register"}>don't have an account?</Link>
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button type="submit">login</Button>
        </div>
        <div className="flex justify-center">
          <InputError message={errors.root?.message} />
        </div>
      </div>
    </form>
  );
}
