import { ProfileAvatar } from "@/components/landing/navbar";
import { Bio, GithubUrl, Onboard } from "@/components/profile";
import { useAuth } from "@/hooks/useAuth";
import useProfile from "@/hooks/useProfile";
import { Outlet } from "react-router-dom";

export function Pro() {
  const { isLoggedIn, username, onboard, userType } = useAuth();
  const { params, error } = useProfile();
  // const u = JSON.parse(user);
  // if (isLoggedIn && username === params.username) {
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="mx-10 md:mx-20 lg:mx-40">
      {params.username === username && onboard === false ? (
        <Onboard userType={userType} />
      ) : (
        <div className="flex justify-center">
          <div>
            <div>
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
        </div>
      )}
    </div>
  );
}
