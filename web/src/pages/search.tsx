import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchDataContext } from "@/lib/context";
import { SearchBar } from "@/components/search/searchBar";
import { SearchResults } from "@/components/search/searchResults";

export default function SearchPage() {
  const [data, setData] = useState<object[]>([{}]);
  let [searchParams] = useSearchParams();
  const [role, setRole] = useState<string>(
    searchParams.get("role")?.toString() || ""
  );
  const [status, setStatus] = useState<boolean>(role ? true : false);

  const val = {
    status,
    setStatus,
    role,
    setRole,
    data,
    setData,
  };
  console.log(status, role);
  return (
    <div className="min-h-96">
      <searchDataContext.Provider value={val}>
        <div className="w-full border-black flex justify-center">
          <SearchBar />
        </div>
        {role ? <SearchResults role={role} /> : <></>}
      </searchDataContext.Provider>
    </div>
  );
}
