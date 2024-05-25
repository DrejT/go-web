import { Header } from "./features";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <section className="my-20 sm:w-full md:my-20 w-full flex justify-center">
      <div className="w-full mx-10">
        <Header title="Faq" />
        <div className="md:flex justify-center">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger className="text-left">
                Are the jobs posted real?
              </AccordionTrigger>
              <AccordionContent>Yes, they are 100% real</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger className="text-left">
                How much do I have to pay for applying/posting a job post?
              </AccordionTrigger>
              <AccordionContent>
                Applying for/Posting jobs is completely <strong>free</strong> on
                our platform
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
