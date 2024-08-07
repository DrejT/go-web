import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useHeroForm } from "@/hooks/useHeroForm";
import InputError from "../ui/inputError";

export function Hero() {
  const { register, onSubmit, errors, handleSubmit } = useHeroForm();
  return (
    <section className="my-20 md:my-24 lg:my-32 xl:my-40 flex justify-center items-center">
      <form className="w-full px-4" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center text-pretty pb-4">
          {" "}
          Your First
          <br /> Internship
        </h1>
        <div className="flex flex-col items-center justify-center">
          <Input
            type="text"
            placeholder="IT intern"
            id="searchTerm"
            {...register("searchTerm", {
              required: "search field cannot be empty",
            })}
            className="mb-2 sm:w-auto"
          />
          {/* <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Search />
          </div> */}
          <Button className="w-full sm:w-auto" type="submit">
            search
          </Button>
          <InputError message={errors.root?.message} />
        </div>
      </form>
    </section>
  );
}
