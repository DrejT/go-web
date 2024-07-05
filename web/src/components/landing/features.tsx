import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, redirect } from "react-router-dom";

// import { BarChart4, Handshake, Landmark } from "lucide-react";

export function Features() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="block  sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6 md:flex">
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                Free for all
              </h2>
              <p className="leading-relaxed text-base">completely free</p>
            </div>
          </div>
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                startup focused{" "}
              </h2>
              <p className="leading-relaxed text-base">
                great startups require great talents
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                100% real Jobs{" "}
              </h2>
              <p className="leading-relaxed text-base">
                only jobs posted by human
              </p>
            </div>
          </div>
        </div>
        <Link to={"/login"}>
          <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
}

interface featureCardProps {
  icon: React.ReactNode;
  title: string | React.ReactNode;
  description: string;
}

function FeatureCard({ icon, title, description }: featureCardProps) {
  return (
    <Card
      className="flex justify-center my-8 lg:mx-8"
      style={{ width: "300px", height: "auto" }}
    >
      <CardHeader className="">
        <div className="flex justify-center mb-3">{icon}</div>
        <CardTitle className="flex justify-center">{title}</CardTitle>
        <CardDescription className="flex justify-center">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function Header({ title }: { title: string }) {
  return (
    <div className="flex justify-center mb-10">
      <h3 className="text-2xl font-semibold">{title}</h3>
    </div>
  );
}
