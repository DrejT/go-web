import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
// import { useAuth } from "@/hooks/useAuth";

interface NavItem {
  navName: string;
  navStyle: string;
  navUrl: string;
}

export function NavBar() {
  // const { user } = useAuth();
  const p = useLocation();
  const url = p.pathname === "/login" ? "register" : "login";
  return (
    <div className={`w-full max-w-screen-lg md:mx-12 lg:mx-20 xl:mx-0`}>
      <NavigationMenu>
        <div className="w-screen">
          <NavigationMenuList className="h-16 px-3 flex md:justify-between">
            <GuestNavItemsList />
            {/* {user ? <UserNavItemsList /> : <GuestNavItemsList />} */}
            <div>
              <NavigationMenuItem>
                <Link to={url}>
                  <Button>{url}</Button>
                </Link>
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

// function UserNavItemsList() {
//   const userNav: NavItem[] = [
//     {
//       navName: "search",
//       navStyle: "",
//       navUrl: "/",
//     },
//   ];
//   return (
//     <div>
//       {userNav.map((obj) => {
//         return (
//           <NavigationMenuItem className={obj.navStyle} key={obj.navName}>
//             <Link to="/">
//               <Button>{obj.navName}</Button>
//             </Link>
//           </NavigationMenuItem>
//         );
//       })}
//     </div>
//   );
// }
