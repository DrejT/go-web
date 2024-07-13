import useProfile from "@/hooks/useProfile";
import OrgProfile from "@/components/profile/org";
import UserProfile from "@/components/profile/user";
import { ProfileData } from "@/lib/types";
export function Profile() {
  const { error, isOrg, data } = useProfile();
  if (error) {
    return <div>{error}</div>;
  }
  if (isOrg) {
    return <OrgProfile data={data as ProfileData} />;
  } else {
    return <UserProfile data={data as ProfileData} />;
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
