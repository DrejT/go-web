import { ProfileAvatar } from "@/components/landing/navbar";
import { useAuth } from "@/hooks/useAuth";
import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  // Outlet,
  useParams,
} from "react-router-dom";

export function Pro() {
  const params = useParams();
  const { isLoggedIn, username } = useAuth();
  const [data, setData] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post(
          API_URL + "user/",
          { username: params.username },
          { withCredentials: true }
        );
        console.log(res);
        // setData(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (!data) {
      fetchData();
      setData(!data);
    }
  });
  // const u = JSON.parse(user);
  // if (isLoggedIn && username === params.username) {
  return (
    <>
      <div className="mx-10 md:mx-20 lg:mx-40">
        <div className="flex justify-center">
          <div className="md:block">
            <ProfileAvatar
              username={params.username || ""}
              src=""
              h={18}
              w={18}
            />
            <h3 className="text-pretty font-normal text-3xl text-center flex justify-center md:block">
              {params.username}
            </h3>
          </div>
        </div>

        <div>
          <Bio isLoggedIn={isLoggedIn} />
        </div>
      </div>

      {/* <Outlet /> */}
    </>
  );
}

function Bio({ isLoggedIn }: { isLoggedIn: boolean }) {
  console.log(isLoggedIn);
  if (isLoggedIn === true) {
    return (
      <div>
        <p>readme</p>
      </div>
    );
  }
}
