import { Outlet, BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/landing";
import { LandingLayout } from "@/layouts/landing";
import Root from "@/layouts/root";
import RegisterFormLayout from "@/layouts/register";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
// import SearchPage from "@/pages/search";
import { Profile } from "@/pages/profile";
import { ProfileLayout } from "@/layouts/profile";
import Logout from "@/components/logout";

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
            <Route path="logout" element={<Logout />} />
            {/* <Route path="search" element={<SearchPage />} /> */}
            <Route>
              <Route path="org">
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
                <Route
                  path=":orgname"
                  element={
                    <ProfileLayout>
                      <Profile />
                    </ProfileLayout>
                  }
                />

                {/* <Route path="" element={<>register page</>} /> */}
              </Route>
              <Route
                path=":username"
                element={
                  <ProfileLayout>
                    <Profile />
                  </ProfileLayout>
                }
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
