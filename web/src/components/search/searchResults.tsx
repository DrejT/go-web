import { searchDataContext } from "@/lib/context";
import { searchDataContextProps } from "@/lib/types";
import { API_URL } from "@/lib/utils";
import { useContext, useEffect } from "react";

export function SearchResults({ role }: { role: string }) {
  const { status, setStatus, setData, data } = useContext(
    searchDataContext
  ) as searchDataContextProps;
  useEffect(() => {
    async function fetchData() {
      try {
        await fetch(API_URL + "search?role=" + role, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: role }),
        })
          .then((res) => res.json())
          .then((data) => setData(data));
      } catch (error) {
        console.log(error);
      }
    }
    // fetchData();
    if (status) {
      fetchData();
      setStatus(false);
    }
  }, [data, status]);
  return (
    <div className="md:flex justify-between">
      <div className="md:">categories</div>
      <div className="md:">results</div>
      <div className="md:">options</div>
    </div>
  );
}
