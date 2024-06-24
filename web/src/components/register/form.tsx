import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useRegisterForm from "@/hooks/useRegisterForm";
import InputError from "../ui/inputError";
import useBusiness from "@/hooks/useOrg";

export function RegisterForm() {
  const { errors, register, handleSubmit, onSubmit } = useRegisterForm();
  const { isBusiness, loginUrl, userType } = useBusiness();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <div className="flex justify-center">
          <h3 className="md:text-2xl font-semibold">
            {isBusiness ? "Business " : ""}Register
          </h3>
        </div>
        <div className="mb-1">
          <div className="">
            <Label htmlFor="username">username</Label>
            <Input
              {...register("username", {
                required: "username is required",
                minLength: {
                  value: 4,
                  message: "length of atleast 4 letters",
                },
              })}
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              placeholder="vivek patel"
            />
          </div>
          <InputError message={errors.username?.message} />

          <div className="">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email", {
                required: "email is required",
              })}
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="vivek@gmail.com"
            />
            <InputError message={errors.email?.message} />
          </div>

          <div className="">
            <Label htmlFor="password">password</Label>
            <Input
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 8,
                  message: "length of atleast 8 letters",
                },
              })}
              type="password"
              id="password"
              name="password"
            />
            <InputError message={errors.password?.message} />
          </div>
          <div>
            <Input {...register("usertype")} value={userType} type="hidden" />
          </div>
          <div>
            <p className="text-sm">
              <Link to={loginUrl}>already registered?</Link>
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit">register</Button>
        </div>
        <div className="flex justify-center">
          <InputError message={errors.root?.message} />
        </div>
      </div>
    </form>
  );
}
