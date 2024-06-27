import { ProfileAvatar } from "@/components/landing/navbar";
import { Bio, GithubUrl, Onboard } from "@/components/profile";
import { useAuth } from "@/hooks/useAuth";
import useProfile from "@/hooks/useProfile";
import { ProfileData } from "@/lib/types";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useJobs from "@/hooks/useJobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAddJob from "@/hooks/useAddJob";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Profile() {
  const { error, isOrg, data } = useProfile();
  if (error) {
    return <div>{error}</div>;
  }
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
  const { jobsList, error } = useJobs();
  console.log(jobsList);
  return (
    <>
      <AddJobButton />
      {!jobsList ? (
        <div className="text-center p-5">{error}</div>
      ) : (
        <>
          {jobsList.map((jobObj) => (
            <Job
              title={jobObj.Title}
              description={jobObj.Description}
              location={jobObj.Location}
              experience={jobObj.Experience}
              jobType={jobObj.JobType}
              flexibility={jobObj.Flexibility}
            />
          ))}
        </>
      )}
    </>
  );
}

function AddJobButton() {
  const { register, handleSubmit, onSubmit } = useAddJob();
  return (
    <Dialog>
      <DialogTrigger className="w-full bg-primary rounded py-1 cursor-pointer text-white">
        Add Job
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Job?</DialogTitle>
          <DialogDescription>
            fill out the details of the new job
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mb-3">
              <div className="mb-2">
                <Label htmlFor="title">title</Label>
                <Input type="text" id="title" {...register("Title")} />
              </div>
              <div className="mb-2">
                <Label htmlFor="description">description</Label>
                <Textarea id="description" {...register("Description")} />
              </div>
              <div className="mb-2">
                <Label htmlFor="location">location</Label>
                <Input type="text" id="location" {...register("Location")} />
              </div>
              <div className="mb-2">
                <Label htmlFor="job-type">type</Label>
                <RadioGroup
                  id="job-type"
                  className="flex"
                  defaultValue="full-time"
                  {...register("JobType")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full-time" id="full-time" />
                    <Label htmlFor="full-time">full time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="part-time" id="part-time" />
                    <Label htmlFor="part-time">part time</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="mb-2">
                <Label htmlFor="flexibility">flexibility</Label>

                <RadioGroup
                  className="flex"
                  id="flexibility"
                  defaultValue="in-office"
                  {...register("Flexibility")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="in-office" id="in-office" />
                    <Label htmlFor="in-office">on site</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="work-from-home"
                      id="work-from-home"
                    />
                    <Label htmlFor="work-from-home">work from home [WFH]</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="mb-2">
                <Label htmlFor="experience">minimum years of experience</Label>
                <Input
                  type="string"
                  id="experience"
                  {...register("Experience")}
                />
              </div>
            </div>
            <div>
              <Button type="submit">create job</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
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
  jobType,
  flexibility,
}: {
  title: string;
  description: string;
  location: string;
  experience: string;
  jobType: "full-time" | "part-time";
  flexibility: "in-office" | "work-from-home";
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
