import { layoutProps } from "@/lib/types";

export default function RegisterFormLayout({ children }: layoutProps) {
  return (
    <div className=" md:flex justify-center items-center min-h-screen">
      <div
        className="border stroke-black max-w-96 md: h-96 flex justify-center items-center m-20"
        style={{ width: "400px" }}
      >
        {children}
      </div>
    </div>
  );
}
