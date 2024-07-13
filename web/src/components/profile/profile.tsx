import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useGithubUrl } from "@/hooks/useGithubUrl";
import InputError from "@/components/ui/inputError";
import { Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import useOrgOnBoardForm from "@/hooks/useOrgOnBoardForm";
import useUserOnBoardForm from "@/hooks/useUserOnBoardForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

export function Onboard({ userType }: { userType: string }) {
  console.log(userType);
  if (userType === "org") {
    return <OrgOnBoardForm />;
  }
  return <UserOnBoardForm />;
}

export function OrgOnBoardForm() {
  const { register, errors, handleSubmit, onSubmit } = useOrgOnBoardForm();
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3 className="font-extrabold text-3xl text-center">
            {" "}
            Lets get you on board
          </h3>
        </div>
        <div>
          <div className="mb-1">
            <div className="mb-3">
              <Label className="">Organisation Name</Label>
              <Input
                {...register("orgName", {
                  required: "organisation name is required",
                })}
                type="text"
                placeholder="Facebook Inc"
              />
              <InputError message={errors.orgName?.message} />
            </div>
            <div className="mb-3">
              <Label className="">Address</Label>
              <Input
                {...register("address", {
                  required: "Address is required",
                })}
                type="text"
                placeholder="stardew alley"
              />
              <InputError message={errors.address?.message} />
            </div>
            <div className="mb-3">
              <Label className="">pincode</Label>
              <Input
                {...register("pincode", {
                  required: "pincode is required",
                })}
                type="number"
                placeholder="123456"
              />
              <InputError message={errors.pincode?.message} />
            </div>
            <div className="mb-3">
              <Label className="">employee count</Label>
              <Input
                {...register("employeeCount", {
                  required: "employee count is required",
                })}
                type="number"
                placeholder="5"
              />
              <InputError message={errors.employeeCount?.message} />
            </div>
            <div className="mb-3">
              <Label className="">
                website Url <em>(optional)</em>
              </Label>
              <Input
                {...register("websiteUrl")}
                type="text"
                placeholder="facebook.com"
              />
              <InputError message={errors.websiteUrl?.message} />
            </div>
          </div>
          <div className="block">
            <div>
              <InputError message={errors?.root?.message} />
            </div>
            <Button type="submit">submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export function UserOnBoardForm() {
  const { register, errors, handleSubmit, onSubmit } = useUserOnBoardForm();
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3 className="font-extrabold text-3xl text-center">
            {" "}
            Lets get you on board
          </h3>
        </div>
        <div>
          <div className="mb-1">
            <div className="mb-3">
              <Label className="">Organisation Name</Label>
              <Input
                {...register("universityName", {
                  required: "university name is required",
                })}
                type="text"
                placeholder="University Of Mumbai"
              />
              <InputError message={errors.universityName?.message} />
            </div>
            <div className="mb-3">
              <Label className="">college Name</Label>
              <Input
                {...register("collegeName", {
                  required: "college name is required",
                })}
                type="text"
                placeholder="VCET"
              />
              <InputError message={errors.collegeName?.message} />
            </div>
            <div className="mb-3">
              <Label className="">education</Label>
              <Input
                {...register("education", {
                  required: "education is required",
                })}
                type="text"
                placeholder="BE IT"
              />
              <InputError message={errors.education?.message} />
            </div>
            <div className="mb-3">
              <Label className="">
                Github Url <em>(optional)</em>
              </Label>
              <Input
                {...register("githubUrl")}
                type="text"
                placeholder="github.com/drejt"
              />
              <InputError message={errors.githubUrl?.message} />
            </div>
            <div className="mb-3">
              <Label className="">
                Website Url <em>(optional)</em>
              </Label>
              <Input
                {...register("websiteUrl")}
                type="text"
                placeholder="facebook.com"
              />
              <InputError message={errors.websiteUrl?.message} />
            </div>
          </div>
          <div className="block">
            <div>
              <InputError message={errors?.root?.message} />
            </div>
            <Button type="submit">submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export function GithubUrl() {
  const { errors, handleSubmit, register, onSubmit } = useGithubUrl();
  return (
    <Dialog>
      <DialogTrigger>
        <Edit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter your github profile URL</DialogTitle>
          <DialogDescription>
            this url will be used to generate your profile
          </DialogDescription>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <div className="flex m-3">
                  <Label htmlFor="githubUrl" className="mt-1">
                    https://
                  </Label>
                  <input
                    type="text"
                    id="githubUrl"
                    placeholder="github.com/drejt"
                    className="w-full"
                    {...register("githubUrl", {
                      required: "please enter a url",
                      minLength: {
                        value: 12,
                        message: "please enter a valid url",
                      },
                    })}
                  />
                </div>
                <div className="p-0 m-0">
                  <InputError message={errors.githubUrl?.message} />
                </div>
                <div>
                  <Button type="submit" className="px-2">
                    submit
                  </Button>
                </div>
                <div className="flex justify-center">
                  <InputError message={errors.root?.message} />
                </div>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export function Bio({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (isLoggedIn === true) {
    return (
      <div>
        <p>readme</p>
      </div>
    );
  }
}

export function ProfileHeaderLayout({ children }: { children: ReactNode }) {
  return (
    <div className="text-center text-pretty font-semibold text-3xl m-4">
      {children}
    </div>
  );
}
