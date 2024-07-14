import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { Details, Job, Onboard, ProfileHeaderLayout } from "./profile";
import { useAuth } from "@/hooks/useAuth";
import { ProfileAvatar } from "../landing/navbar";
import { JobProps, ProfileData } from "@/lib/types";
import useApplication from "@/hooks/useApplication";

export default function UserProfile({ data }: { data: ProfileData }) {
  const { isLoggedIn, username, onboard, userType, profileUrl } = useAuth();
  const p = useParams();
  console.log(data);
  if (isLoggedIn && username === p.username) {
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
                profileUrl={profileUrl}
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
                <TabsTrigger className="w-[400px]" value="applications">
                  applications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                {" "}
                <UserDetailsSection data={data} />
              </TabsContent>
              <TabsContent value="applications">
                <UserApplicationsSection />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
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
              profileUrl={profileUrl}
            />
            <ProfileHeaderLayout>{data.Username}</ProfileHeaderLayout>
          </div>
        </div>
        <div className="flex justify-center">
          <Tabs defaultValue="details" className="">
            <TabsList>
              <TabsTrigger className="w-[400px]" value="details">
                Details
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              {" "}
              <UserDetailsSection data={data} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function UserDetailsSection({ data }: { data: ProfileData }) {
  return (
    <div>
      <Details header={"Education"} info={data.Education} />
      <Details header={"Github"} info={data.GithubUrl || "not provided"} />
      <Details header={"College name"} info={data.CollegeName} />
      <Details header={"University name"} info={data.UniversityName} />
    </div>
  );
}

function UserApplicationsSection() {
  const { data, error } = useApplication();
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div className="mt-2">
        {data.map((jobObj: JobProps, index: number) => (
          <div key={index}>
            <Job jobObj={jobObj} />
          </div>
        ))}
      </div>
    </div>
  );
}
