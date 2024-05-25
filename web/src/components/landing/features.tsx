import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { BarChart4, Handshake, Landmark } from "lucide-react";

export function Features() {
  return (
    <section className="my-20">
      <div className="">
        <Header title="Features" />
        <div className="flex justify-center">
          <div className="lg:flex justify-evenly">
            <FeatureCard
              icon={<Landmark width={50} height={50} />}
              title="Free for all"
              description="completely free"
            />
            <FeatureCard
              icon={<Handshake width={50} height={50} />}
              title={"100% real Jobs"}
              description="only jobs posted by human"
            />
            <FeatureCard
              icon={<BarChart4 width={50} height={50} />}
              title="startup focused"
              description="great startups require great talents"
            />
          </div>
        </div>
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
