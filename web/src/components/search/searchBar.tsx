import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { FormEvent, useContext } from "react";
import { searchDataContext } from "@/lib/context";
import { useNavigate } from "react-router-dom";
import { searchDataContextProps } from "@/lib/types";

export function SearchBar() {
  const navigate = useNavigate();
  const { setStatus, setRole, role } = useContext(
    searchDataContext
  ) as searchDataContextProps;
  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        setStatus(true);
        navigate("/search?role=" + role);
      }}
      className="flex md:flex items-center px-3 py-2"
    >
      <Input
        type="text"
        placeholder="IT Intern"
        id="role"
        name="role"
        className="mr-2 flex-1"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <Button type="submit" className="rounded-md px-4 py-2">
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
}
