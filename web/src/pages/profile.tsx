import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProfileAvatar } from "@/components/landing/navbar";
import { useAuth } from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useGithubUrl } from "@/hooks/useGithubUrl";
import InputError from "@/components/ui/inputError";
import { Edit } from "lucide-react";
import useProfile from "@/hooks/useProfile";
import { Input } from "@/components/ui/input";
import useOrgOnBoardForm from "@/hooks/useOrgOnBoardForm";
import useUserOnBoardForm from "@/hooks/useUserOnBoardForm";

export function Pro() {
  const { isLoggedIn, username, onboard, userType } = useAuth();
  const { params } = useProfile();
  // const u = JSON.parse(user);
  // if (isLoggedIn && username === params.username) {
  return (
    <>
      <div className="mx-10 md:mx-20 lg:mx-40">
        {params.username === username && onboard === false ? (
          <Onboard userType={userType} />
        ) : (
          <div className="flex justify-center">
            <div className="md:block">
              <div className="mb-3">
                <ProfileAvatar
                  username={params.username || ""}
                  src=""
                  h={18}
                  w={18}
                />
              </div>
              <div>
                <Outlet />
              </div>

              <div className="flex justify-center pl-4">
                <h3 className="text-pretty font-normal text-3xl text-center flex justify-center md:block">
                  {params.username}
                </h3>
                {params.username === username ? (
                  <div>
                    <GithubUrl />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div>
              <Bio isLoggedIn={isLoggedIn} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Onboard({ userType }: { userType: string }) {
  console.log(userType);
  if (userType === "org") {
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
                  {...register("organisationName", {
                    required: "organisation name is required",
                  })}
                  type="text"
                  placeholder="Facebook Inc"
                />
                <InputError message={errors.organisationName?.message} />
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
            <div className="flex justify-center">
              <Button type="submit">submit</Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
  return <UserOnBoardForm />;
}

function UserOnBoardForm() {
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
          <div className="flex justify-center">
            <Button type="submit">submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function GithubUrl() {
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

function Bio({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (isLoggedIn === true) {
    return (
      <div>
        <p>readme</p>
      </div>
    );
  }
}
