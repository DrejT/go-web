// import { useAuth } from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";

export default function Root() {
  // const { user, token } = useAuth();
  // console.log(user, token);
  return (
    <div className="m-0 p-0 min-h-screen bg-background font-sans antialiased flex justify-center overflow-x-hidden">
      <Outlet />
    </div>
  );
}
