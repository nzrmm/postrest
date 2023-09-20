import React from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils/style";
import { IRouteType } from "@/constants/route";

type INavbarItemProps = LinkProps & IRouteType;

const NavbarItem = ({ href, name, ...props }: INavbarItemProps) => {
  const pathname = usePathname();

  const isActive = () => {
    if (href === "/" && pathname === href) return true;
    if (href !== "/" && pathname.includes(href)) return true;

    return false;
  };

  return (
    <Link
      href={href}
      className={cn(
        "text-neutral-700",
        "lg:px-6 lg:py-1.5 lg:rounded-md lg:hover:bg-neutral-100",
        {
          "font-semibold text-neutral-900 lg:bg-neutral-100": isActive(),
        }
      )}
      {...props}
    >
      {name}
    </Link>
  );
};

export default NavbarItem;
