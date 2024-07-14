import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useJobs from "@/hooks/useJobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAddJob from "@/hooks/useAddJob";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileAvatar } from "@/components/landing/navbar";
import { Details, Job, Onboard, ProfileHeaderLayout } from "./profile";
import { JobProps, ProfileData } from "@/lib/types";
import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function OrgProfile({ data }: { data: ProfileData }) {
  const { isLoggedIn, username, onboard, userType, profileUrl } = useAuth();
  const p = useParams();
  if (isLoggedIn && username === p.orgname) {
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
              <ProfileHeaderLayout>{data.Username}</ProfileHeaderLayout>
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
                <OrgDetailsSection data={data} />
              </TabsContent>
              <TabsContent value="jobs">
                <JobsSection
                  displayAddButton={isLoggedIn && username === p.orgname}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
  return (
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
            <TabsTrigger className="w-[400px]" value="jobs">
              Jobs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <OrgDetailsSection data={data} />
          </TabsContent>
          <TabsContent value="jobs">
            <JobsSection
              displayAddButton={isLoggedIn && username === p.orgname}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function OrgDetailsSection({ data }: { data: ProfileData }) {
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

function JobsSection({ displayAddButton }: { displayAddButton: boolean }) {
  const { jobsList, error } = useJobs();
  console.log(jobsList);
  return (
    <>
      {displayAddButton ? <AddJobButton /> : <></>}
      {!jobsList ? (
        <div className="text-center p-5">{error}</div>
      ) : (
        <div className="mt-2">
          {jobsList.map((jobObj: JobProps, index: number) => (
            <div key={index}>
              <Job jobObj={jobObj} />
            </div>
          ))}
        </div>
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
