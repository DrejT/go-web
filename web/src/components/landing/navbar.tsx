import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

export function NavBar() {
  const itemClass = "px-1";
  const p = useLocation();
  const url = p.pathname === "/login" ? "register" : "login";
  return (
    <div className="w-full max-w-screen-lg md:mx-12 lg:mx-20 xl:mx-0">
      <NavigationMenu>
        <div className="w-screen">
          <NavigationMenuList className="h-16 px-3 flex md:justify-between">
            <div className="flex justify-center ">
              <NavigationMenuItem>
                <Link to="/">
                  <Button>logo</Button>
                </Link>{" "}
              </NavigationMenuItem>
              <NavigationMenuItem className={itemClass}>
                <Link to="/">
                  <Button>features</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className={itemClass}>
                <Link to="/">
                  <Button>faq</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className={itemClass}>
                <Link to="/">
                  <Button>about</Button>
                </Link>
              </NavigationMenuItem>
            </div>
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
