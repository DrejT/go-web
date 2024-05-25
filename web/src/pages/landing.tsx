import { Faq } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { Separator } from "@/components/ui/separator";

export default function Landing() {
  return (
    <>
      <Hero />
      <Separator />
      <Features />
      <Separator />
      <Faq />
    </>
  );
}
