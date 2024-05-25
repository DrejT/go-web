import Footer from "@/components/landing/footer";
import { NavBar } from "@/components/landing/navbar";
import { layoutProps } from "@/lib/types";

export function LandingLayout({ children }: layoutProps) {
  return (
    <main>
      <NavBar />
      {children}
      <Footer />
    </main>
  );
}
