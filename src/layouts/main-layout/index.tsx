import React from "react";

import { Header } from "@/layouts";
import { cn } from "@/utils/style";

type IMainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <div className={cn("antialiased bg- text-neutral-900")}>
      <Header />
      <main
        className={cn("mx-auto w-[88%] pt-10 pb-28", "lg:max-w-6xl lg:py-40")}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
