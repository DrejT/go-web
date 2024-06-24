import { ProfileAvatar } from "@/components/landing/navbar";
import { Bio, GithubUrl, Onboard } from "@/components/profile";
import { useAuth } from "@/hooks/useAuth";
import useProfile from "@/hooks/useProfile";
import { ProfileData } from "@/lib/types";
import { Outlet, useParams } from "react-router-dom";

export function Profile() {
  const { error, isOrg, data } = useProfile();
  if (error) {
    return <div>{error}</div>;
  }
  console.log(data);
  if (isOrg) {
    return <OrgProfile data={data} />;
  } else {
    return <UserProfile data={data} />;
  }
  // return (
  //   <div className="mx-10 md:mx-20 lg:mx-40">
  //     {params.username === username && onboard === false ? (
  //       <Onboard userType={userType} />
  //     ) : (
  //       <div className="flex justify-center">
  //         <div>
  //           <div>
  //             <div className="mb-3">
  //               <ProfileAvatar
  //                 username={params.username || ""}
  //                 src=""
  //                 h={18}
  //                 w={18}
  //               />
  //             </div>
  //             <div>
  //               <Outlet />
  //             </div>

  //             <div className="flex justify-center pl-4">
  //               <h3 className="text-pretty font-normal text-3xl text-center flex justify-center md:block">
  //                 {params.username}
  //               </h3>
  //               {params.username === username ? (
  //                 <div>
  //                   <GithubUrl />
  //                 </div>
  //               ) : (
  //                 <></>
  //               )}
  //             </div>
  //           </div>
  //           <div>
  //             <Bio isLoggedIn={isLoggedIn} />
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
}

function OrgProfile({ data }: { data: ProfileData }) {
  const { isLoggedIn, username, onboard, userType } = useAuth();
  const p = useParams();
  // case where user is viewing their own profile with an active session
  if (isLoggedIn && username === p.orgname) {
    // if the user has not yet been onboarded
    if (!onboard) {
      return <Onboard userType={userType} />;
    }
    return <div>welcome back {username}</div>;
  }

  // user is viewing other person's profile with an active session
  if (isLoggedIn) {
    return <div>hello guest</div>;
  }

  // default profile shown to guests without an active session
  return (
    <div>
      <div className="flex justify-center">{data.UserType}</div>
    </div>
  );
}

function UserProfile({ data }: { data: ProfileData }) {
  const { isLoggedIn, username, onboard, userType } = useAuth();
  const p = useParams();
  // case where user is viewing their own profile with an active session
  if (isLoggedIn && username === p.username) {
    // if the user has not yet been onboarded
    if (!onboard) {
      return <Onboard userType={userType} />;
    }
    return <div>welcome back {username}</div>;
  }

  // user is viewing other person's profile with an active session
  if (isLoggedIn) {
    return <div>hello guest</div>;
  }

  // default profile shown to guests without an active session
  return (
    <div>
      <div className="flex justify-center">{data.UserType}</div>
    </div>
  );
}
