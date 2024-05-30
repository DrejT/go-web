import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="m-0 p-0 min-h-screen font-sans antialiased flex justify-center overflow-x-hidden">
      <Outlet />
    </div>
  );
}
