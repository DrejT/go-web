import ReactDOM from "react-dom/client";
// import { Router } from "react-router-dom";
import Router from "./lib/router";
import "./index.css";
import { AuthProvider } from "./lib/providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    {/* <RouterProvider router={router} /> */}
    <Router />
  </AuthProvider>
);
