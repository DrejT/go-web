import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  navName: string;
  navStyle: string;
  navUrl: string;
}

export function NavBar() {
  const { isLoggedIn, username, userType, profileUrl } = useAuth();
  const p = useLocation();
  const url = p.pathname === "/login" ? "register" : "login";
  return (
    <div
      className={`w-full max-w-screen-${
        isLoggedIn ? "" : "lg"
      } md:mx-12 lg:mx-20 xl:mx-0`}
    >
      <NavigationMenu>
        <div className="w-screen">
          <NavigationMenuList className="h-16 px-3 flex md:justify-between">
            {isLoggedIn ? <UserNavItemsList /> : <GuestNavItemsList />}
            <div>
              <NavigationMenuItem>
                {isLoggedIn ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <ProfileAvatar
                          username={username}
                          src=""
                          h={10}
                          w={10}
                          profileUrl={profileUrl}
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link to={profileUrl}>
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                        </Link>
                        <Link to="/logout">
                          <DropdownMenuItem>Logout</DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <Link to={url}>
                    <Button>{url}</Button>
                  </Link>
                )}
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </div>
      </NavigationMenu>
    </div>
  );
}

function GuestNavItemsList() {
  const itemClass = "px-1";
  const guestNav: NavItem[] = [
    {
      navName: "logo",
      navStyle: "",
      navUrl: "/",
    },
    {
      navStyle: itemClass,
      navName: "features",
      navUrl: "/",
    },
    {
      navStyle: itemClass,
      navName: "faq",
      navUrl: "/",
    },
    {
      navStyle: itemClass,
      navName: "about",
      navUrl: "/",
    },
  ];
  return (
    <>
      <div className="flex justify-center">
        {guestNav.map((obj) => {
          return (
            <NavigationMenuItem className={obj.navStyle} key={obj.navName}>
              <Link to="/">
                <Button>{obj.navName}</Button>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </div>
    </>
  );
}

function UserNavItemsList() {
  const itemClass = "px-1";
  const userNav: NavItem[] = [
    {
      navName: "logo",
      navStyle: itemClass,
      navUrl: "/",
    },
    {
      navName: "search",
      navStyle: itemClass,
      navUrl: "/",
    },
  ];
  return (
    <div className="flex justify-center">
      {userNav.map((obj) => {
        return (
          <NavigationMenuItem className={obj.navStyle} key={obj.navName}>
            <Link to="/">
              <Button>{obj.navName}</Button>
            </Link>
          </NavigationMenuItem>
        );
      })}
    </div>
  );
}

export function ProfileAvatar({
  username,
  src,
  h,
  w,
  profileUrl,
}: {
  username: string;
  src: string;
  h: number;
  w: number;
  profileUrl: string;
}) {
  return (
    <Link to={profileUrl} className="">
      <Avatar className={`rounded-full w-${w} h-${h} overflow-hidden`}>
        <AvatarImage
          // className="w-full h-full"
          src={src || "https://github.com/shadcn.png"}
        />
        <AvatarFallback>{username}</AvatarFallback>
      </Avatar>
    </Link>
  );
}
