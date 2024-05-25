import {
  Outlet,
  useParams,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Landing from "@/pages/landing";
import { LandingLayout } from "@/layouts/landing";
import Root from "@/layouts/root";
import { useAuth } from "./../hooks/useAuth";
import { useEffect, useState } from "react";
import { postData } from "./fetch";
import RegisterFormLayout from "@/layouts/register";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import SearchPage from "@/pages/search";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route
            element={
              <LandingLayout>
                <Outlet />
              </LandingLayout>
            }
          >
            <Route index element={<Landing />} />
            <Route
              path="login"
              element={
                <RegisterFormLayout>
                  <LoginPage />
                </RegisterFormLayout>
              }
            />
            <Route
              path="register"
              element={
                <RegisterFormLayout>
                  <RegisterPage />
                </RegisterFormLayout>
              }
            />
          </Route>
          <Route path="search" element={<SearchPage />} />
          <Route path=":username" element={<Pro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Pro() {
  const params = useParams();
  const { user, token } = useAuth();
  const [data, setData] = useState<boolean>(false);
  console.log(user, token);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await postData("user/", {}).then((res) => res.json());
        setData(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (!data) {
      fetchData();
      setData(!data);
    }
  });
  const u = JSON.parse(user);
  if (u.username === params.username && token) {
    return (
      <>
        welcome back
        <br />
        {u.username}
        <Outlet />
      </>
    );
  }
  return (
    <>
      welcome guest <br />
      profile
    </>
  );
}

export default Router;
