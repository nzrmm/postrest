import Link from "next/link";

import { NavbarItem } from "@/components/commons";
import { ROUTES } from "@/constants/route";
import { cn } from "@/utils/style";

const Header = () => {
  return (
    <div
      className={cn(
        "fixed w-full bottom-0 border-t border-t-neutral-200 bg-white/60 backdrop-blur-xl z-50",
        "lg:top-auto lg:bottom-auto lg:border-b lg:border-b-neutral-200 lg:border-t-0"
      )}
    >
      <nav className={cn("flex justify-between items-center h-16 px-6")}>
        <Link href={"/"} className={cn("font-bold text-xl")}>
          Postrest .
        </Link>

        <div className={cn("flex items-center gap-4 lg:gap-1")}>
          {ROUTES.map((item, index) => (
            <NavbarItem key={index} href={item.href} name={item.name} />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Header;
