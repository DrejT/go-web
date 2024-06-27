import { ProfileAvatar } from "@/components/landing/navbar";
import { Bio, GithubUrl, Onboard } from "@/components/profile";
import { useAuth } from "@/hooks/useAuth";
import useProfile from "@/hooks/useProfile";
import { ProfileData } from "@/lib/types";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useJobs from "@/hooks/useJobs";

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
  // user is viewing their own profile with an active session
  if (isLoggedIn && username === p.orgname) {
    // if the user has not yet been onboarded
    if (!onboard) {
      return <Onboard userType={userType} />;
    }
    return (
      <div>
        welcome back {username}
        <div>
          <div className="flex justify-center">
            <div>
              <ProfileAvatar
                username={p.orgname || ""}
                src=""
                h={18}
                w={18}
                usertype="org"
              />
              {data.Username}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // user is viewing other person's profile with an active session
  // if (isLoggedIn) {
  //   return <div>hello guest</div>;
  // }

  // default profile shown to guests without an active session
  return (
    <div>
      <div className="flex justify-center">
        <div>
          <ProfileAvatar
            username={p.orgname || ""}
            src=""
            h={18}
            w={18}
            usertype="org"
          />
          <div className="text-center text-pretty font-semibold text-3xl m-4">
            {data.Username}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Tabs defaultValue="details" className="">
          <TabsList>
            <TabsTrigger className="w-[400px]" value="details">
              Details
            </TabsTrigger>
            <TabsTrigger className="w-[400px]" value="jobs">
              Jobs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <DetailsSection data={data} />
          </TabsContent>
          <TabsContent value="jobs">
            <JobsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function DetailsSection({ data }: { data: ProfileData }) {
  return (
    <div>
      <Details header={"orgnaisation name"} info={data.OrgName} />
      <Details header={"Address"} info={data.OrgAddress} />
      <Details header={"employees"} info={data.EmployeeCount} />
      {data.WebsiteUrl !== "" ? (
        <Details header={"website"} info={data.WebsiteUrl} />
      ) : (
        <></>
      )}
    </div>
  );
}

function JobsSection() {
  const { jobsList } = useJobs();
  if (jobsList.length < 1) {
    return <div>no jobs listed right now</div>;
  }
  return (
    <div>
      {jobsList.map((jobObj) => (
        <Job
          title={jobObj.Title}
          description={jobObj.Description}
          location={jobObj.Location}
          experience={jobObj.Experience}
          language={jobObj.Language}
          jobType={jobObj.JobType}
          flexibilty={jobObj.Flexibilty}
        />
      ))}
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
    return (
      <div>
        welcome back {username}
        <div>
          <div className="flex justify-center">
            <div>
              <ProfileAvatar
                username={p.orgname || ""}
                src=""
                h={18}
                w={18}
                usertype="org"
              />
              {data.Username}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // user is viewing other person's profile with an active session
  // if (isLoggedIn) {
  //   return <div>hello guest</div>;
  // }

  // default profile shown to guests without an active session
  return (
    <div>
      <div className="flex justify-center">{data.Username}</div>
    </div>
  );
}

function Details({ header, info }: { header: string; info: string | number }) {
  return (
    <div>
      <div className="font-semibold text-xl">{header}: </div>
      {info}
    </div>
  );
}

function Job({
  title,
  description,
  location,
  experience,
  language,
  jobType,
  flexibilty,
}: {
  title: string;
  description: string;
  location: string;
  experience: string;
  language: string;
  jobType: "full-time" | "part-time";
  flexibilty: "in-office" | "work-from-home";
}) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
