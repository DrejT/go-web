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
import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useGithubUrl } from "@/hooks/useGithubUrl";
import InputError from "@/components/ui/inputError";
import { Edit } from "lucide-react";

export function Pro() {
  const params = useParams();
  const { isLoggedIn, username, onboard } = useAuth();
  const [data, setData] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post(
          API_URL + "user/",
          { username: params.username },
          { withCredentials: true }
        );
        console.log(res);
        // setData(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (!data) {
      fetchData();
      setData(!data);
    }
  });
  // const u = JSON.parse(user);
  // if (isLoggedIn && username === params.username) {
  return (
    <>
      <div className="mx-10 md:mx-20 lg:mx-40">
        {!onboard ? (
          <Onboard />
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

function Onboard() {
  return (
    <div>
      <form action="">enter details here</form>
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
