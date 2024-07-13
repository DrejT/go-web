import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { Onboard, ProfileHeaderLayout } from "./profile";
import { useAuth } from "@/hooks/useAuth";
import { ProfileAvatar } from "../landing/navbar";
import { ProfileData } from "@/lib/types";

export default function UserProfile({ data }: { data: ProfileData }) {
  const { isLoggedIn, username, onboard, userType, profileUrl } = useAuth();
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
                <TabsTrigger className="w-[400px]" value="jobs">
                  Jobs
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                {/* <DetailsSection data={data} /> */}
                user details
              </TabsContent>
              <TabsContent value="jobs">
                applied to
                {/* <JobsSection
                    displayAddButton={isLoggedIn && username === p.orgname}
                  /> */}
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
        <div className="flex justify-center">{}</div>
      </div>
    </div>
  );
}
