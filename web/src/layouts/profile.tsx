import { layoutProps } from "@/lib/types";

export function ProfileLayout({ children }: layoutProps) {
  return <div className="mx-10 md:mx-20 lg:mx-40">{children}</div>;
}
