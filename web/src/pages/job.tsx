import { Button } from "@/components/ui/button";
import useJobData from "@/hooks/useJobData";
import { Link } from "react-router-dom";

export default function JobPage() {
  const { jobData, error } = useJobData();
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            {/* <div className="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src="https://dummyimage.com/1200x500"
              />
            </div> */}
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-semibold text-2xl title-font mt-4 text-gray-900">
                    <Link to={"/org/" + jobData?.OrgName}>
                      {jobData?.OrgName}
                    </Link>{" "}
                  </h2>
                  <p className="text-base">Location: {jobData?.Location}</p>

                  <p className="text-base">Jobtype: {jobData?.JobType}</p>
                  <p className="text-base">
                    Experience: {jobData?.Experience} years
                  </p>
                  <p className="text-base">
                    Flexibility: {jobData?.Flexibility}
                  </p>
                  {/* <p className="text-base">
                    Flexibility: {jobData?.Flexibility}
                  </p> */}
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <div>
                  <h3 className="font-normal text-2xl">{jobData?.Title}</h3>
                  <p className="leading-relaxed text-lg mb-4">
                    {jobData?.Description}
                  </p>
                  <Button type="submit">apply now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
